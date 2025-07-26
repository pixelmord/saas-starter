import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/hello").methods({
	GET: () => {
		return new Response(JSON.stringify({ message: `Hello!` }));
	},
});
