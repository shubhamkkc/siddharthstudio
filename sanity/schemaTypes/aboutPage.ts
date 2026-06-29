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
        fields: [
          defineField({ name: "icon", title: "Icon Emoji", type: "string" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
        ],
      }],
    }),
    defineField({ name: "ctaHeading", title: "CTA Heading", type: "string" }),
    defineField({ name: "ctaBody", title: "CTA Body", type: "text" }),
  ],
});
