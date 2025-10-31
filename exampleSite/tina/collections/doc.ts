import { Collection } from "tinacms";

const Doc: Collection = {
  name: "docs",
  label: "Docs",
  path: "content/docs",
  frontmatterFormat: "toml",
  frontmatterDelimiters: "+++",
  format: "md",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "number",
      name: "weight",
      label: "Weight"
    },
    {
      type: "string",
      name: "description",
      label: "Description"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
};

export default Doc;
