import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "ghost-destructive";

type ButtonProps = {
	variant?: Variant;
} & ComponentProps<"button">;

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
	return (
		<button
			type="button"
			{...props}
			className={twMerge(
				"rounded px-2 py-1 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
				getVariantStyles(variant),
				className,
			)}
		/>
	);
}

function getVariantStyles(variant: Variant) {
	switch (variant) {
		case "primary":
			return "bg-violet-600 text-white hover:bg-violet-500";
		case "secondary":
			return "bg-zinc-700 text-zinc-300 hover:bg-zinc-600";
		case "ghost-destructive":
			return "text-red-400 hover:bg-red-500/10";
		default:
			throw new Error(`Invalid variant: ${variant satisfies never}`);
	}
}
