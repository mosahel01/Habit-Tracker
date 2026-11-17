import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		try {
			const storedValue = window.localStorage.getItem(key);
			return storedValue === null ? initialValue : (JSON.parse(storedValue) as T);
		} catch {
			return initialValue;
		}
	});

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch {
			// Storage can be unavailable or full; keep the in-memory state usable.
		}
	}, [key, value]);

	return [value, setValue] as const;
}
