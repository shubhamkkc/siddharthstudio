import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "text" }),
    defineField({ name: "storyHeading", title: "Story Heading", type: "string" }),
    defineField({ name: "storyParagraphs", title: "Story Paragraphs", type: "array", of: [{ type: "text" }] }),
    defineField({
      name: "profiles",
      title: "Profile Cards",
      description: "Bio cards shown in the sidebar of the story section (replaces the old founder & company info cards).",
      type: "array",
      of: [{
        type: "object",
        name: "profile",
        title: "Profile Card",
        fields: [
          defineField({ name: "avatar", title: "Avatar Initials", type: "string", description: "Example: KS or GS" }),
          defineField({ name: "image", title: "Avatar Image", type: "image", options: { hotspot: true } }),
          defineField({ name: "name", title: "Name", type: "string" }),
          defineField({ name: "title", title: "Title/Role", type: "string" }),
          defineField({ name: "bio", title: "Bio/Description", type: "text" }),
          defineField({
            name: "links",
            title: "Social Links",
            type: "array",
            of: [{
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "href", title: "Link URL", type: "string" }),
              ],
            }],
          }),
        ],
      }],
    }),
    defineField({
      name: "values",
      title: "Core Values",
      type: "array",
      of: [{
        type: "object",
        preview: {
          select: { title: "title", subtitle: "description" },
        },
        fields: [
          defineField({
            name: "icon",
            title: "Icon SVG",
            type: "text",
            description: "Paste SVG code here. Example: <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">...</svg>. You can get SVG icons from lucide.dev or heroicons.com",
            rows: 4,
          }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
        ],
      }],
    }),
  ],
});
