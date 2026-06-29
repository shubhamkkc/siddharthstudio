import { defineType, defineField } from "sanity";

export default defineType({
  name: "pricingPage",
  title: "Pricing Page",
  type: "document",
  fields: [
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "text" }),
    defineField({
      name: "individualDesigns",
      title: "Individual Design Cards",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "icon", title: "Icon SVG", type: "text" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
          defineField({ name: "features", title: "Features", type: "array", of: [{ type: "string" }] }),
          defineField({ name: "originalPrice", title: "Original Price", type: "string" }),
          defineField({ name: "price", title: "Price", type: "string" }),
          defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
          defineField({ name: "ctaHref", title: "CTA URL", type: "string" }),
        ],
      }],
    }),
    defineField({
      name: "thumbnailPacks",
      title: "Thumbnail Packs",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Pack Name", type: "string" }),
          defineField({ name: "designs", title: "Number of Designs", type: "string" }),
          defineField({ name: "price", title: "Price", type: "string" }),
          defineField({ name: "originalPrice", title: "Original Price", type: "string" }),
          defineField({ name: "savings", title: "Savings Text", type: "string" }),
          defineField({ name: "featured", title: "Featured?", type: "boolean" }),
          defineField({ name: "ctaId", title: "CTA ID", type: "string" }),
        ],
      }],
    }),
    defineField({
      name: "socialMediaPacks",
      title: "Social Media Packs",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Pack Name", type: "string" }),
          defineField({ name: "designs", title: "Number of Designs", type: "string" }),
          defineField({ name: "price", title: "Price", type: "string" }),
          defineField({ name: "originalPrice", title: "Original Price", type: "string" }),
          defineField({ name: "savings", title: "Savings Text", type: "string" }),
          defineField({ name: "featured", title: "Featured?", type: "boolean" }),
          defineField({ name: "ctaId", title: "CTA ID", type: "string" }),
        ],
      }],
    }),
    defineField({
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "Question", type: "string" }),
          defineField({ name: "answer", title: "Answer", type: "text" }),
        ],
      }],
    }),
  ],
});
