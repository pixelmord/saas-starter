// Check that CONVEX_SITE_URL is defined
if (!process.env.CONVEX_SITE_URL) {
	throw new Error(
		"CONVEX_SITE_URL environment variable is required but not set. Please set it to your Convex site URL.",
	);
}

export default {
	providers: [
		{
			// Your Convex site URL is provided in a system
			// environment variable
			domain: process.env.CONVEX_SITE_URL,

			// Application ID has to be "convex"
			applicationID: "convex",
		},
	],
};
