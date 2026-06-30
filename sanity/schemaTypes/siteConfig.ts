import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteConfig",
  title: "Site Configuration",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site Title", type: "string" }),
    defineField({ name: "siteDescription", title: "Site Description", type: "text" }),
    defineField({ name: "logo", title: "Logo Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "navigation",
      title: "Navigation Links",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "href", title: "URL", type: "string" })
        ]
      }]
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "text"
    }),
    defineField({
      name: "ctaSection",
      title: "CTA Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text" }),
        defineField({
          name: "buttons",
          title: "Buttons",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "label", title: "Label", type: "string" }),
              defineField({ name: "href", title: "Link URL", type: "url" })
            ]
          }]
        })
      ]
    }),
    // Footer columns (heading + links)
    defineField({
      name: "footerColumns",
      title: "Footer Columns",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({
            name: "links",
            title: "Links",
            type: "array",
            of: [{
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "href", title: "URL", type: "string" })
              ]
            }]
          })
        ]
      }]
    }),
    // Social links for footer
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "href", title: "URL", type: "string" }),
          defineField({ name: "iconSvg", title: "Icon SVG", type: "text" })
        ]
      }]
    })
  ]
});
