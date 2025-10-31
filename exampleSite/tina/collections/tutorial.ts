import { Collection } from "tinacms";

const Tutorial: Collection = {
  name: "tutorials",
  label: "Tutorials",
  path: "content/tutorials",
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
      label: "Weight",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
};

export default Tutorial;
