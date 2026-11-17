import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "./Button";
import { useHabits } from "../context/useHabits";

export default function HabitForm() {
	const { addHabit } = useHabits();
	const [name, setName] = useState("");

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		addHabit(name);
		setName("");
	}

	return (
		<form className="flex gap-2" onSubmit={handleSubmit}>
			<label className="sr-only" htmlFor="habit-name">
				Habit name
			</label>
			<input
				id="habit-name"
				className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
				placeholder="Add a habit..."
				value={name}
				onChange={(event) => setName(event.target.value)}
				autoComplete="off"
			/>
			<Button type="submit" disabled={name.trim() === ""}>
				Add habit
			</Button>
		</form>
	);
}
