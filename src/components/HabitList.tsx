import { eachDayOfInterval, endOfWeek, format, isFuture, parseISO, subDays } from "date-fns";
import { Button } from "./Button";
import { useHabits } from "../context/useHabits";
import type { Habit } from "../context/useHabits";

export default function HabitList() {
	const { habits, weekStart, todayKey, deleteHabit, toggleCompletion } = useHabits();

	const visibleDates = eachDayOfInterval({
		start: weekStart,
		end: endOfWeek(weekStart, { weekStartsOn: 1 }),
	});

	if (habits.length === 0) {
		return (
			<p className="py-12 text-center text-zinc-500">
				No habits yet. Add one above to get started.
			</p>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{habits.map((habit) => (
				<HabitRow
					key={habit.id}
					habit={habit}
					dates={visibleDates}
					todayKey={todayKey}
					onToggle={toggleCompletion}
					onDelete={deleteHabit}
				/>
			))}
		</div>
	);
}

type HabitRowProps = {
	habit: Habit;
	dates: Date[];
	todayKey: string;
	onToggle: (habitId: string, dateKey: string) => void;
	onDelete: (habitId: string) => void;
};

function HabitRow({ habit, dates, todayKey, onToggle, onDelete }: HabitRowProps) {
	const streak = getStreak(habit.completions, todayKey);

	return (
		<div className="flex flex-col gap-3 rounded-xl bg-zinc-800 p-4">
			<div className="flex items-center justify-between gap-4">
				<div className="flex min-w-0 items-center gap-3">
					<span className="truncate font-medium">{habit.name}</span>
					<span
						className="text-sm text-amber-200"
						title={`${streak} day streak`}
					>
						🔥 {streak}
					</span>
				</div>
				<Button
					variant="ghost-destructive"
					onClick={() => onDelete(habit.id)}
					aria-label={`Delete ${habit.name}`}
				>
					Delete
				</Button>
			</div>

			<div className="flex gap-1.5">
				{dates.map((date) => {
					const dateKey = format(date, "yyyy-MM-dd");
					const isCompleted = habit.completions.includes(dateKey);
					const isToday = dateKey === todayKey;

					return (
						<Button
							key={dateKey}
							variant={isCompleted ? "primary" : "secondary"}
							className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 px-1 py-1 text-xs ${isToday ? "ring-2 ring-violet-400 ring-offset-2 ring-offset-zinc-800" : ""}`}
							disabled={isFuture(date)}
							aria-pressed={isCompleted}
							aria-label={`${format(date, "EEEE, MMMM d")}${isCompleted ? ", completed" : ""}`}
							onClick={() => onToggle(habit.id, dateKey)}
						>
							<span className="font-medium">{format(date, "EEE")}</span>
							<span>{format(date, "d")}</span>
						</Button>
					);
				})}
			</div>
		</div>
	);
}

function getStreak(completions: string[], todayKey: string) {
	const completedDates = new Set(completions);
	let cursor = parseISO(todayKey);

	if (!completedDates.has(format(cursor, "yyyy-MM-dd"))) {
		cursor = subDays(cursor, 1);
	}

	let streak = 0;

	while (completedDates.has(format(cursor, "yyyy-MM-dd"))) {
		streak += 1;
		cursor = subDays(cursor, 1);
	}

	return streak;
}
