import type { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
	return (
		<div className="min-h-screen w-full flex justify-center p-4">
			<div className="w-full max-w-md">{children}</div>
		</div>
	);
};
