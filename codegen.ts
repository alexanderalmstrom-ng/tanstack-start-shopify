import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      [`https://${getShopifyShopName()}.myshopify.com/api/2025-10/graphql.json`]:
        {
          headers: {
            "Shopify-Storefront-Private-Token": getShopifyToken(),
          },
        },
    },
  ],
  documents: ["src/**/*.{ts,tsx}", "!src/gql/**/*"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
      config: {
        documentMode: "string",
        useTypeImports: true,
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};

function getShopifyShopName() {
  if (process.env.VITE_SHOPIFY_SHOP_NAME) {
    return process.env.VITE_SHOPIFY_SHOP_NAME;
  }

  throw new Error("No Shopify shop name found");
}

function getShopifyToken() {
  if (process.env.SHOPIFY_ACCESS_TOKEN) {
    return process.env.SHOPIFY_ACCESS_TOKEN;
  }

  throw new Error("No Shopify token found");
}

export default config;
