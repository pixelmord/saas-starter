import { cn } from "@repo/ui/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export const Container = ({ children, className, ...rest }: ContainerProps) => (
	<div
		className={cn("min-h-screen w-full flex justify-center p-4", className)}
		{...rest}
	>
		<div className="w-full max-w-md">{children}</div>
	</div>
);
