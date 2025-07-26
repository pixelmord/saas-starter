import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/user")({
	component: UserLayout,
});

function UserLayout() {
	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold">User Dashboard</h1>
				<p className="text-muted-foreground">
					Manage your account settings and preferences
				</p>
			</div>
			<Outlet />
		</div>
	);
}
