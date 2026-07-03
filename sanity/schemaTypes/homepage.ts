import { defineType, defineField } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    // SEO
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),

    // Hero
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow Text", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({ name: "heroBody", title: "Hero Body Text", type: "text" }),
    defineField({ name: "heroFootnote", title: "Hero Footnote", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "heroPrimaryCta",
      title: "Hero Primary CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "URL", type: "string" }),
      ],
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Hero Secondary CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "URL", type: "string" }),
      ],
    }),

    // Stats
    defineField({
      name: "stats",
      title: "Stats Strip",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "Value", type: "string" }),
          defineField({ name: "label", title: "Label", type: "string" }),
        ],
      }],
    }),

    // Services grid
    defineField({
      name: "services",
      title: "Services Grid",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "icon", title: "Icon SVG", type: "text" }),
          defineField({ name: "image", title: "Service Image (Cover)", type: "image", options: { hotspot: true } }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
          defineField({ name: "gradient", title: "Gradient Class", type: "string" }),
          defineField({ name: "href", title: "Link", type: "string" }),
        ],
      }],
    }),

    // Pricing tiers
    defineField({
      name: "pricingTiers",
      title: "Pricing Tiers",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Tier Name", type: "string" }),
          defineField({ name: "price", title: "Price", type: "string" }),
          defineField({ name: "originalPrice", title: "Original Price", type: "string" }),
          defineField({ name: "description", title: "Description", type: "string" }),
          defineField({ name: "features", title: "Features", type: "array", of: [{ type: "string" }] }),
          defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
          defineField({ name: "ctaHref", title: "CTA URL", type: "string" }),
          defineField({ name: "featured", title: "Featured?", type: "boolean" }),
        ],
      }],
    }),

    // Testimonials
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Name", type: "string" }),
          defineField({ name: "role", title: "Role / Description", type: "string" }),
          defineField({ name: "quote", title: "Quote", type: "text" }),
          defineField({ name: "avatar", title: "Avatar Initials", type: "string" }),
          defineField({ name: "avatarImage", title: "Avatar Image", type: "image", options: { hotspot: true } }),
          defineField({ name: "rating", title: "Rating (1-5)", type: "number" }),
        ],
      }],
    }),

    // How it works
    defineField({
      name: "steps",
      title: "How It Works Steps",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "number", title: "Step Number", type: "string" }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text" }),
          defineField({ name: "image", title: "Step Image", type: "image", options: { hotspot: true } }),
        ],
      }],
    }),

    // FAQ
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

    // SEO Content
    defineField({ name: "seoContentHeading", title: "SEO Content Heading", type: "string" }),
    defineField({ name: "seoContentBody", title: "SEO Content Body", type: "text" }),
    defineField({ name: "seoImage", title: "SEO OpenGraph Image", type: "image", options: { hotspot: true } }),
  ],
});
