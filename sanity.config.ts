import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "growsquadz",
  title: "GrowSquadz CMS",

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "your-project-id-here",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  router: {
    unstable_hashRouter: true,
  },
});
