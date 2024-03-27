import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";
import node from "@astrojs/node";
import solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["ik.imagekit.io"],
  },
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  site: "https://home.civdev.xyz",
  integrations: [tailwind(), sitemap(), db(), solid()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
