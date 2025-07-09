import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import {
	fetchSession,
	getCookieName,
} from "@convex-dev/better-auth/react-start";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { createAuth } from "@repo/server/convex/auth";
import { Toaster } from "@repo/ui/components/ui/sonner";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
	useRouteContext,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getWebRequest } from "@tanstack/react-start/server";
import { ConvexReactClient } from "convex/react";
import type * as React from "react";
import { Loader } from "@/components/loader";
import { authClient } from "@/lib/auth-client";
import appCss from "../style.css?url";

// Server side session request
const fetchAuth = createServerFn({ method: "GET" }).handler(async () => {
	const sessionCookieName = await getCookieName(createAuth);
	console.log("sessionCookieName", sessionCookieName);
	const token = getCookie(sessionCookieName);
	const request = getWebRequest();

	const { session } = await fetchSession(createAuth, request);
	console.log("session", session, token);
	return {
		userId: session?.user.id,
		token,
	};
});

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	convexClient: ConvexReactClient;
	convexQueryClient: ConvexQueryClient;
}>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "SaaS Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	beforeLoad: async (ctx) => {
		// all queries, mutations and action made with TanStack Query will be
		// authenticated by an identity token.
		const auth = await fetchAuth();
		const { userId, token } = auth;

		// During SSR only (the only time serverHttpClient exists),
		// set the auth token for Convex to make HTTP queries with.
		if (token) {
			ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
		}

		return { userId, token };
	},
	notFoundComponent: () => <div>Route not found</div>,
	component: RootComponent,
});

function RootComponent() {
	const context = useRouteContext({ from: Route.id });
	return (
		<ConvexBetterAuthProvider
			client={context.convexClient}
			authClient={authClient}
		>
			<RootDocument>
				<Outlet />
			</RootDocument>
		</ConvexBetterAuthProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Toaster richColors />
				<TanStackRouterDevtools position="bottom-left" />
				<Scripts />
			</body>
		</html>
	);
}
