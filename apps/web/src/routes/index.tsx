import { convexQuery } from "@convex-dev/react-query";
import { api } from "@repo/server/convex/_generated/api";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@repo/ui/components/ui/navigation-menu";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Container } from "@/components/Container";
export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const { data } = useSuspenseQuery(convexQuery(api.tasks.get, {}));

	return (
		<Container>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Unauthenticated>
							<NavigationMenuLink asChild>
								<Link to="/sign-in">Sign in</Link>
							</NavigationMenuLink>
						</Unauthenticated>
						<Authenticated>
							<NavigationMenuLink asChild>
								<Link to="/app">Dashboard</Link>
							</NavigationMenuLink>
						</Authenticated>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			{data.map(({ _id, text }) => (
				<div key={_id}>{text}</div>
			))}
			<AuthLoading>
				<div>Loading...</div>
			</AuthLoading>
		</Container>
	);
}
