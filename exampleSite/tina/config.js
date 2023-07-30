import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "6ff9830b-b18a-4d21-b38c-cae1679e335f", // Get this from tina.io
  token: "2954980a0db18868974dc57a66be9ecdfe6f336b", // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "doc",
        label: "Docs",
        path: "content/docs",
        frontmatterFormat: "toml",
        frontmatterDelimiters: "+++",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: false,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: false,
          },
          {
            type: "number",
            name: "weight",
            label: "Weight",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "homepage",
        label: "Homepage",
        path: "content",
        frontmatterFormat: "toml",
        frontmatterDelimiters: "+++",
        match: {
          include: "*index*"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        // date
        // tags
        // categories
        name: "post",
        label: "Posts",
        path: "content/blog",
        frontmatterFormat: "toml",
        frontmatterDelimiters: "+++",
        match: {
          exclude: "*index.md"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            ui: {
              dateFormat: "YYYY-MM-DD"
            },
            required: false,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: false,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: false,
          },
          {
            name: "categories",
            label: "Categories",
            type: "string",
            list: true,
            searchable: false,
            ui: {
              validate: (value, data)=>{
                const num_of_categories = value?.length;
                if(num_of_categories > 7 ){
                  return `Cannot exceed 7 ${value}`
                }
              }
            }
          },
          {
            name: "tag",
            label: "tags",
            type: "string",
            list: true,
            searchable: false,
            ui: {
              validate: (value, data)=>{
                const num_of_categories = value?.length;
                if(num_of_categories > 7 ){
                  return `Cannot exceed 7 ${value}`
                }
              }
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "tutorial",
        label: "Tutorials",
        path: "content/tutorials",
        frontmatterFormat: "toml",
        frontmatterDelimiters: "+++",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: false,
          },
          {
            type: "image",
            name: "image",
            label: "Image",
            required: false,
          },
          {
            type: "number",
            name: "weight",
            label: "Weight",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      }
    ]
  },
  search: {
    tina: {
      indexerToken: "977c145439dda036080dd7a33478d2ba385ab5af",
      stopwordLanguages: ["deu", "eng", "fra", "ita", "spa", "nld"]
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  }
});
