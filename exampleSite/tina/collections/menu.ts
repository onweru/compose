import { Collection } from "tinacms";

const Menu: Collection = {
  name: "menu",
  label: "Menus",
  path: "config/_default/menus/",
  format: "toml",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    }
  },
  fields: [
    {
      type: "object",
      name: "main",
      label: "Main Menu",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        }
      },
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name"
        },
        {
          type: "string",
          name: "url",
          label: "URL"
        },
        {
          type: "number",
          name: "weight",
          label: "Weight",
          description: "Controls ordering"
        },
      ]
    }
  ]
};

export default Menu;
