import { convexClient } from "@convex-dev/better-auth/client/plugins";
import {
	emailOTPClient,
	magicLinkClient,
	twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	plugins: [
		magicLinkClient(),
		emailOTPClient(),
		twoFactorClient(),
		convexClient(),
	],
});

// export const { fetchSession, reactStartHandler, getCookieName } =
// 	reactStartHelpers(createAuth, {
// 		convexSiteUrl: import.meta.env.VITE_CONVEX_SITE_URL,
// 	});
