import { Collection } from "tinacms";

const Setting: Collection = {
  name: "setting",
  label: "Other Settings",
  path: "config/_default",
  format: "toml",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    }
  },
  match: {
    include: "*params*",
  },
  fields: [
    {
      type: "boolean",
      name: "uniqueHomePage",
      label: "Homepage is unique",
      description: "change to false to add sidebar to homepage"
    },
    {
      type: "string",
      name: "docSections",
      label: "Doc Sections",
      list: true,
      description: "use the setting to set multiple docs directories."
    },
    {
      type: "string",
      name: "repo",
      label: "Repository link"
    },
    {
      type: "string",
      name: "time_format_blog",
      label: "Time Format",
      description: "e.g. Monday, January 02, 2006"
    },
    {
      type: "string",
      name: "time_format_default",
      label: "Time format default",
      description: "e.g January 2, 2006"
    },
    {
      type: "boolean",
      name: "EnableDarkMode",
      label: "Enable Dark Mode",
      description: "set to false to disable darkmode by default # user will still have the option to use dark mode"
    },
    {
      type: "string",
      name: "defaultLighingMode",
      label: "Default Lighting Mode",
      description: "possible values: \"auto\", \"dark\", \"light\". Defaults to 'auto'"
    },
    {
      type: "number",
      name: "codeMaxLines",
      label: "Maximum lines in snippet",
      description: "sets the maximum number of lines per codeblock. The codeblock will however be scrollable and expandable."
    },
    {
      type: "boolean",
      name: "showLineNumbers",
      label: "Show line numbers",
      description: "show/hide line numbers by default. Switch to `true` if you'd rather have them on."
    },
    {
      type: "string",
      name: "iconsPath",
      label: "Icons path",
      description: "By default the template will look for icons under the `icons` directory",
    },
    {
      type: "object",
      name: "author",
      label: "Author",
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name",
        },
        {
          type: "string",
          name: "url",
          label: "Profile/Portfolio link",
        }
      ]
    },
    {
      type: "object",
      name: "logo",
      label: "Site Logo",
      fields: [
        {
          type: "image",
          name: "lightMode",
          label: "Light mode logo",
        },
        {
          type: "image",
          name: "darkMode",
          label: "Dark mode logo",
        }
      ]
    },
    {
      type: "object",
      name: "source",
      label: "Repo details",
      fields: [
        {
          type: "string",
          name: "name",
          label: "Git Platform",
          description: "e.g bitbucket, github, gitlab"
        },
        {
          type: "string",
          name: "url",
          label: "repository link",
        },
        {
          type: "image",
          name: "iconLight",
          label: "Light mode icon",
        },
        {
          type: "image",
          name: "iconDark",
          label: "Dark mode icon",
        }
      ]
    },
    {
      type: "boolean",
      name: "enableCopyright",
      label: "Enable copyright",
      description: "Defaults to 'true'. Enable copyRight Footer Stamp. Takes in attribution.",
    },
    {
      type: "object",
      name: "search",
      label: "Search Settings",
      fields: [
        {
          type: "boolean",
          name: "on",
          label: "Enable search"
        },
        {
          type: "boolean",
          name: "global",
          label: "Enable global search"
        },
        {
          type: "object",
          name: "algolia",
          label: "Algolia search",
          fields: [
            {
              type: "boolean",
              name: "enable",
              label: "Enable Algolia search",
              description: "if not enabled search will default to fusejs"
            },
            {
              type: "string",
              name: "id",
              label: "Algolia ID"
            },
            {
              type: "string",
              name: "index",
              label: "Algolia search index name",
            },
            {
              type: "string",
              name: "key",
              label: "Search-Only API key"
            }
          ]
        }
      ]
    },
    {
      type: "string",
      name: "otherSearchableFields",
      list: true,
      label: "Other searchable fields",
      description: "As they appear in frontmatter"
    }
  ]
};

export default Setting;
