import { createContext, useContext } from "react";

export type Habit = {
	id: string;
	name: string;
	completions: string[];
};

export type HabitContextValue = {
	habits: Habit[];
	weekStart: Date;
	todayKey: string;
	isCurrentWeek: boolean;
	addHabit: (name: string) => void;
	deleteHabit: (habitId: string) => void;
	toggleCompletion: (habitId: string, dateKey: string) => void;
	goToPreviousWeek: () => void;
	goToNextWeek: () => void;
};

export const HabitContext = createContext<HabitContextValue | null>(null);

export function useHabits() {
	const context = useContext(HabitContext);

	if (context === null) {
		throw new Error("useHabits must be used inside a HabitProvider");
	}

	return context;
}
