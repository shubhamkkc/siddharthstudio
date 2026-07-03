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
    defineField({ name: "storyParagraphs", title: "Story Paragraphs", type: "array", of: [{ type: "text" }] }),
    defineField({
      name: "companyInfo",
      title: "Company Info Rows",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "value", title: "Value", type: "string" }),
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
    defineField({ name: "ctaHeading", title: "CTA Heading", type: "string" }),
    defineField({ name: "ctaBody", title: "CTA Body", type: "text" }),
    defineField({ name: "founderName", title: "Founder/Leader Name", type: "string" }),
    defineField({ name: "founderTitle", title: "Founder/Leader Title", type: "string" }),
    defineField({ name: "founderBio", title: "Founder/Leader Bio", type: "text" }),
    defineField({ name: "founderAvatar", title: "Founder/Leader Avatar Initials", type: "string", description: "Initials to display inside the avatar. Example: KS or GS" }),
    defineField({
      name: "founderLinks",
      title: "Founder/Leader Social Links",
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
});
