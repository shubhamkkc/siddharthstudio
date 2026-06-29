import { defineType, defineField } from "sanity";

export default defineType({
  name: "portfolioPage",
  title: "Portfolio Page",
  type: "document",
  fields: [
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "text" }),
    defineField({ name: "filterCategories", title: "Filter Categories", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "portfolioItems",
      title: "Portfolio Items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "client", title: "Client", type: "string" }),
          defineField({ name: "category", title: "Category", type: "string" }),
          defineField({ name: "image", title: "Project Image", type: "image", options: { hotspot: true } }),
          defineField({ name: "bgColor", title: "Background Color", type: "string" }),
          defineField({ name: "lineColor", title: "Line Color", type: "string" }),
          defineField({ name: "dotColor", title: "Dot Color", type: "string" }),
        ],
      }],
    }),
    defineField({ name: "ctaHeading", title: "CTA Heading", type: "string" }),
    defineField({ name: "ctaBody", title: "CTA Body", type: "text" }),
  ],
});
