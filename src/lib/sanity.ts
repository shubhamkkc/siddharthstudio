import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const useCdn = import.meta.env.PUBLIC_SANITY_USE_CDN === "true";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "demo-project-id",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn,
  perspective: "published",
});

const originalFetch = sanityClient.fetch.bind(sanityClient);
sanityClient.fetch = async (query: string, params?: any) => {
  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID || import.meta.env.PUBLIC_SANITY_PROJECT_ID === "your-project-id-here") {
    console.warn("Sanity fetch skipped: Missing PUBLIC_SANITY_PROJECT_ID");
    return null;
  }
  return originalFetch(query, params);
};

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
