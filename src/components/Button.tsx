import type { ComponentProps } from "react";

// type ButtonProps = {
// 	children: ReactNode;
// 	disabled?: boolean;
// };

type Variant = "primary" | "secondary" | "ghost-destructive";

type ButtonProps = {
	variant?: Variant;
} & ComponentProps<"button">;

export function Button({ variant = "primary", ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className="bg-violet-600 hover:bg-violet-400 transition-colors rounded px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
		/>
	);
}

function getVariantStyles(variant: Variant) { }
