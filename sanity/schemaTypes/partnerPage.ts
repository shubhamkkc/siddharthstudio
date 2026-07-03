import { defineType, defineField } from "sanity";

export default defineType({
  name: "partnerPage",
  title: "Become a Partner Page",
  type: "document",
  fields: [
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "text" }),
    defineField({ name: "heroBadge", title: "Hero Badge Label", type: "string" }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon (Emoji)", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
          ],
        },
      ],
    }),
    defineField({ name: "eligibilityHeading", title: "Eligibility Section Heading", type: "string" }),
    defineField({ name: "eligibilityDescription", title: "Eligibility Section Description", type: "text" }),
    defineField({ name: "roleTags", title: "Role Tags Offered", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "processSteps",
      title: "Onboarding Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", title: "Step Number", type: "string" }),
            defineField({ name: "title", title: "Step Title", type: "string" }),
            defineField({ name: "description", title: "Step Description", type: "text" }),
          ],
        },
      ],
    }),
    defineField({ name: "ctaHeading", title: "CTA Heading", type: "string" }),
    defineField({ name: "ctaBody", title: "CTA Body", type: "text" }),
  ],
});
