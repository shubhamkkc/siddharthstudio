import { defineType, defineField } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", title: "Page Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),
    defineField({ name: "lastUpdated", title: "Last Updated", type: "date" }),
    defineField({
      name: "body",
      title: "Page Content",
      type: "array",
      of: [
        { type: "block" },
      ],
    }),
  ],
});
