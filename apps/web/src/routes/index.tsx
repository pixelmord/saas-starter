import { convexQuery } from "@convex-dev/react-query";
import { api } from "@repo/server/convex/_generated/api";
import { Button } from "@repo/ui/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const { data } = useSuspenseQuery(convexQuery(api.tasks.get, {}));

	return (
		<div>
			<Button>Click me</Button>
			<Button variant="outline">Click me</Button>
			<Button variant="secondary">Click me</Button>
			<Button variant="ghost">Click me</Button>
			<Button variant="link">Click me</Button>
			<Button variant="destructive">Click me</Button>
			{data.map(({ _id, text }) => (
				<div key={_id}>{text}</div>
			))}
			<AuthLoading>
				<div>Loading...</div>
			</AuthLoading>
			<Unauthenticated>{"unauthed"}</Unauthenticated>
			<Authenticated>{"authed!!!"}</Authenticated>
		</div>
	);
}
