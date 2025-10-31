import { defineConfig } from "tinacms";
import Doc from "./collections/doc";
import Post from "./collections/post";
import Tutorial from "./collections/tutorial";

export default defineConfig({
  clientId: process.env.TINA_CLIENT_ID!,
  branch:
    process.env.TINA_BRANCH! || // custom branch env override
    process.env.VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
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
      Doc,
      Post,
      Tutorial,
    ],
  },
  search: {
    tina: {
      indexerToken: "876018600e28b19feaf033cc3364f588fe8a6248",
      stopwordLanguages: ["deu", "eng", "fra", "ita", "spa", "nld"]
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  }
});
