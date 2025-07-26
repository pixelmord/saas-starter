import { AppSidebar } from "@repo/ui/components/app-sidebar";
import { SiteHeader } from "@repo/ui/components/site-header";
import { SidebarInset, SidebarProvider } from "@repo/ui/components/ui/sidebar";
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
	return (
		<div className="[--header-height:calc(--spacing(14))]">
			<SidebarProvider className="flex flex-col">
				<SiteHeader />
				<div className="flex flex-1">
					<AppSidebar />
					<SidebarInset>
						<Outlet />
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	);
}
