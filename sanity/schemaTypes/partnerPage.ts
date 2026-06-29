import { defineType, defineField } from "sanity";

export default defineType({
  name: "partnerPage",
  title: "Partner Page",
  type: "document",
  fields: [
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "text" }),
    defineField({ name: "heroBadge", title: "Hero Badge Text", type: "string" }),
    defineField({
      name: "benefits",
      title: "Benefits",
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
    defineField({ name: "eligibilityHeading", title: "Eligibility Heading", type: "string" }),
    defineField({ name: "eligibilityDescription", title: "Eligibility Description", type: "text" }),
    defineField({ name: "roleTags", title: "Role Tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "processSteps",
      title: "Application Process Steps",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "number", title: "Step Number", type: "string" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
        ],
      }],
    }),
  ],
});
