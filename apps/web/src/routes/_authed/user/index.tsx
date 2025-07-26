import { convexQuery } from "@convex-dev/react-query";
import { api } from "@repo/server/convex/_generated/api";
import { Button } from "@repo/ui/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, User } from "lucide-react";

export const Route = createFileRoute("/_authed/user/")({
	component: UserDashboard,
});

function UserDashboard() {
	const { data: currentUser } = useSuspenseQuery(
		convexQuery(api.auth.getCurrentUser, {}),
	);

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<Card>
				<CardHeader className="flex flex-row items-center space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Profile</CardTitle>
					<User className="ml-auto h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{currentUser?.name || "No name set"}
					</div>
					<p className="text-xs text-muted-foreground">{currentUser?.email}</p>
					<Button asChild className="mt-4 w-full" size="sm">
						<Link to="/user/account">
							<Settings className="mr-2 h-4 w-4" />
							Edit Profile
						</Link>
					</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Account Status</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-green-600">Active</div>
					<p className="text-xs text-muted-foreground">
						Your account is in good standing
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>
						Manage your account settings and preferences
					</CardDescription>
					<div className="mt-4 space-y-2">
						<Button asChild variant="outline" className="w-full" size="sm">
							<Link to="/user/account">Account Settings</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
