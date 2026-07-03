import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "serviceId", title: "Service ID (slug)", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "icon", title: "Icon SVG Code", type: "text" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "features", title: "Features", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "gradient", title: "Gradient CSS", type: "string" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
});
