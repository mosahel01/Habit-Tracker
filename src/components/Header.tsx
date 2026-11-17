import { endOfWeek, format } from "date-fns";
import { Button } from "./Button";
import { useHabits } from "../context/useHabits";

export default function Header() {
	const { habits, weekStart, todayKey, isCurrentWeek, goToPreviousWeek, goToNextWeek } =
		useHabits();

	const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
	const doneToday = habits.filter((habit) => habit.completions.includes(todayKey)).length;

	return (
		<header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex flex-col gap-1">
				<h1 className="text-3xl font-bold">Habit Tracker</h1>
				<span className="text-sm text-zinc-400">
					{habits.length === 0
						? "No habits yet"
						: `${doneToday}/${habits.length} done today`}
				</span>
			</div>

			<div className="flex flex-col items-start gap-1 sm:items-end">
				<span className="text-sm text-zinc-400">
					{format(weekStart, "MMM d")} – {format(weekEnd, "MMM d")}
				</span>
				<div className="flex items-center gap-2">
					<Button variant="secondary" onClick={goToPreviousWeek} aria-label="Previous week">
						Prev
					</Button>
					<Button
						variant="secondary"
						onClick={goToNextWeek}
						disabled={isCurrentWeek}
						aria-label="Next week"
					>
						Next
					</Button>
				</div>
			</div>
		</header>
	);
}
