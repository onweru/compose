import { Collection } from "tinacms";

const Config: Collection = {
  name: "config",
  label: "Settings",
  path: "config/_default",
  format: "toml",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    }
  },
  match: {
    include: "*hugo*",
  },
  fields: [
    {
      type: "string",
      name: "baseURL",
      label: "Homepage",
      description: "e.g https://example.com/"
    },
    {
      type: "string",
      name: "title",
      label: "Site Title"
    },
    {
      type: "string",
      name: "theme",
      label: "Theme / Template Name",
      list: true, // delete this line when using theme as a non module
      description: "references theme as module"
    },
    {
      type: "boolean",
      name: "enableRobotsTXT",
      label: "Enable Robots Txt"
    },
    {
      type: "boolean",
      name: "enableGitInfo",
      label: "Enable Git",
      description: "Helps provide more content metadata"
    },
    {
      type: "object",
      name: "pagination",
      label: "Pagination Settings",
      fields: [
        {
          type: "boolean",
          name: "disableAliases",
          label: "Disable aliases",
          description: "https://gohugo.io/configuration/pagination/#disablealiases"
        },
        {
          type: "number",
          name: "pagerSize",
          label: "Items per page",
          // description: "defaults to 10",
        },
        {
          type: "string",
          name: "path",
          label: "Path",
          description: "https://gohugo.io/configuration/pagination/#path"
        }
      ]
    },
    {
      type: "string",
      name: "disableKinds",
      label: "Disable Kinds",
      list: true,
      description: "https://gohugo.io/configuration/all/#disablekinds"
    },
    {
      type: "object",
      name: "outputs",
      label: "Outputs",
      description: "https://gohugo.io/configuration/outputs/#outputs-per-page-kind",
      fields: [
        {
          type: "string",
          name: "home",
          label: "Home",
          description: "https://gohugo.io/configuration/outputs/#outputs-per-page-kind",
          list: true
        }
      ]
    }
  ]
}

export default Config;
