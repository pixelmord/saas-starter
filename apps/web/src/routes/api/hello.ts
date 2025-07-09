import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/hello").methods({
	GET: ({ request }) => {
		return new Response(JSON.stringify({ message: `Hello!` }));
	},
});
