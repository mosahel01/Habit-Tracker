import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { addWeeks, format, startOfWeek } from "date-fns";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { HabitContext } from "./useHabits";
import type { Habit } from "./useHabits";

const STORAGE_KEY = "habit-tracker.habits";

type HabitProviderProps = {
	children: ReactNode;
};

export function HabitProvider({ children }: HabitProviderProps) {
	const [storedHabits, setStoredHabits] = useLocalStorage<Habit[]>(STORAGE_KEY, []);
	const [weekOffset, setWeekOffset] = useState(0);
	const [today] = useState(() => new Date());

	const habits = useMemo(
		() => (Array.isArray(storedHabits) ? storedHabits.filter(isHabit) : []),
		[storedHabits],
	);
	const weekStart = addWeeks(startOfWeek(today, { weekStartsOn: 1 }), weekOffset);
	const todayKey = format(today, "yyyy-MM-dd");

	const addHabit = useCallback(
		(name: string) => {
			const trimmedName = name.trim();

			if (trimmedName === "") {
				return;
			}

			setStoredHabits((current) => [
				...current,
				{ id: crypto.randomUUID(), name: trimmedName, completions: [] },
			]);
		},
		[setStoredHabits],
	);

	const deleteHabit = useCallback(
		(habitId: string) => {
			setStoredHabits((current) => current.filter((habit) => habit.id !== habitId));
		},
		[setStoredHabits],
	);

	const toggleCompletion = useCallback(
		(habitId: string, dateKey: string) => {
			setStoredHabits((current) =>
				current.map((habit) => {
					if (habit.id !== habitId) {
						return habit;
					}

					const isCompleted = habit.completions.includes(dateKey);
					const completions = isCompleted
						? habit.completions.filter((date) => date !== dateKey)
						: [...habit.completions, dateKey];

					return { ...habit, completions };
				}),
			);
		},
		[setStoredHabits],
	);

	const value = useMemo(
		() => ({
			habits,
			weekStart,
			todayKey,
			isCurrentWeek: weekOffset === 0,
			addHabit,
			deleteHabit,
			toggleCompletion,
			goToPreviousWeek: () => setWeekOffset((offset) => offset - 1),
			goToNextWeek: () => setWeekOffset((offset) => Math.min(offset + 1, 0)),
		}),
		[habits, weekStart, todayKey, weekOffset, addHabit, deleteHabit, toggleCompletion],
	);

	return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
}

function isHabit(value: unknown): value is Habit {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const habit = value as Record<string, unknown>;

	return (
		typeof habit.id === "string" &&
		typeof habit.name === "string" &&
		Array.isArray(habit.completions) &&
		habit.completions.every((date) => typeof date === "string")
	);
}
