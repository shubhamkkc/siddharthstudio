import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "legalName", title: "Legal Company Name", type: "string" }),
    defineField({ name: "appTitle", title: "App Title (PWA / Apple)", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Default SEO Description", type: "text" }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text" }),
    defineField({ name: "defaultOrderCtaLabel", title: "Default Order CTA Label", type: "string" }),
    defineField({ name: "defaultOrderCtaHref", title: "Default Order CTA Link", type: "url" }),
    defineField({ name: "defaultHelpCtaHref", title: "Default Help CTA Link", type: "url" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Platform Name", type: "string" }),
            defineField({ name: "href", title: "URL", type: "url" }),
            defineField({ name: "iconSvg", title: "Icon SVG Code", type: "text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "footerColumns",
      title: "Footer Link Columns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Column Heading", type: "string" }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "href", title: "URL", type: "string" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({ name: "footerCtaEyebrow", title: "Footer CTA Eyebrow", type: "string" }),
    defineField({ name: "footerCtaHeading", title: "Footer CTA Heading", type: "string" }),
    defineField({ name: "footerCtaBody", title: "Footer CTA Body", type: "text" }),
    defineField({ name: "footerCtaPrimaryLabel", title: "Footer CTA Primary Button Label", type: "string" }),
    defineField({ name: "footerCtaPrimaryHref", title: "Footer CTA Primary Button Link (leave empty for default WhatsApp link)", type: "string" }),
    defineField({ name: "footerCtaSecondaryLabel", title: "Footer CTA Secondary Button Label", type: "string" }),
    defineField({ name: "footerCtaSecondaryHref", title: "Footer CTA Secondary Button Link", type: "string" }),
  ],
});
