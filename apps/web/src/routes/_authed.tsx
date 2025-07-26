import { convexQuery } from "@convex-dev/react-query";
import { api } from "@repo/server/convex/_generated/api";
import type { AppSidebarData } from "@repo/ui/components/app-sidebar";
import {
	AppSidebar,
	defaultSidebarData,
} from "@repo/ui/components/app-sidebar";
import { SiteHeader } from "@repo/ui/components/site-header";
import { SidebarInset, SidebarProvider } from "@repo/ui/components/ui/sidebar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/_authed")({
	beforeLoad: ({ context }) => {
		if (!context.userId) {
			throw redirect({ to: "/sign-in" });
		}
	},
	component: AppLayout,
});

function AppLayout() {
	const { data: currentUser } = useSuspenseQuery(
		convexQuery(api.auth.getCurrentUser, {}),
	);

	// Create sidebar data with user information
	const sidebarData: AppSidebarData = {
		...defaultSidebarData,
		user: {
			name: currentUser?.name || currentUser?.email || "User",
			email: currentUser?.email || "",
			avatar:
				currentUser?.avatar || currentUser?.image || "/avatars/default.jpg",
		},
	};

	return (
		<div className="[--header-height:calc(--spacing(14))]">
			<SidebarProvider className="flex flex-col">
				<SiteHeader />
				<div className="flex flex-1">
					<AppSidebar data={sidebarData} />
					<SidebarInset>
						<Outlet />
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	);
}
