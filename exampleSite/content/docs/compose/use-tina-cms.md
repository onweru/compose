+++
title = "Use Tina.io CMS"
description = ""
weight = 3
+++

Would you like to make it easier for someone (a non-techie, perhaps) in your team to make edits easily?

You may skip to the [next section](../organize-content/), if not interested.

Let's sync your site with Tina CMS.

1. Check the root of your site. If you do not have a `tina` folder. Download it using this command. 

    ```
    curl -fsSL https://raw.githubusercontent.com/onweru/compose/master/install-tina-cms.sh | bash
    ```

    {{< tip >}}
    The exampleSite already comes with prefilled placeholder Tina settings. If you set up your site using [option 2](../install-theme/#option-2-recommended)

    {{< /tip >}}

2. Update `./tina/config.js` & `.env` accordingly

    ```json
      ...
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
          ...
        ],
      },
      search: {
        tina: {
          indexerToken: process.env.TINA_SEARCH_TOKEN!,
          stopwordLanguages: ["deu", "eng", "fra", "ita", "spa", "nld"]
        },
        indexBatchSize: 100,
        maxSearchIndexFieldLength: 100
      }
      ...
    ```

3. Run the CMS locally

    ```sh
    # you can use `pnpm, yarn or npm` instead of bun
    bun install && bun dev
    # if dependencies are already installed
    bun dev
    ```

4. When in doubt check [tina CMS docs](https://tina.io/docs)

