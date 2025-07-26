// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

var vite_config_default = defineConfig({
	plugins: [tsconfigPaths(), tailwindcss(), tanstackStart({})],
});
export { vite_config_default as default };
