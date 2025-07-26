import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@repo/ui/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import type { ComponentType } from "react";

export function NavSecondary({
	items,
	LinkComponent = "a",
	...props
}: {
	items: {
		title: string;
		url: string;
		icon: LucideIcon;
	}[];
	LinkComponent?: ComponentType<any> | "a";
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild size="sm">
								<LinkComponent
									{...(LinkComponent === "a"
										? { href: item.url }
										: { to: item.url })}
								>
									<item.icon />
									<span>{item.title}</span>
								</LinkComponent>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
