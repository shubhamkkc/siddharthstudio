import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "text" }),
    defineField({
      name: "channels",
      title: "Contact Channels",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "platform", title: "Platform", type: "string" }),
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "value", title: "Display Value", type: "string" }),
          defineField({ name: "tag", title: "Tag Text", type: "string" }),
          defineField({ name: "href", title: "URL", type: "string" }),
          defineField({ name: "iconBg", title: "Icon Background Color", type: "string" }),
          defineField({ name: "iconColor", title: "Icon Text Color", type: "string" }),
          defineField({ name: "borderColor", title: "Border Accent Color", type: "string" }),
        ],
      }],
    }),
    defineField({
      name: "businessDetails",
      title: "Business Details",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "value", title: "Value", type: "text" }),
        ],
      }],
    }),
    defineField({ name: "quickOrderHeading", title: "Quick Order Heading", type: "string" }),
    defineField({ name: "quickOrderBody", title: "Quick Order Body", type: "text" }),
  ],
});
