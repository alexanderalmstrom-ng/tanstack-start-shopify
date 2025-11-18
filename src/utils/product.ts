import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { graphql } from "@/gql";
import shopifyClient from "@/services/shopify/client";

export const productsQuery = graphql(`
  query Products {
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          media(first: 10) {
            nodes {
              __typename
              id
              ... on MediaImage {
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
  `);

// export const mediaImageFragment = graphql(`
//   fragment mediaImage on MediaImage {
//     __typename
//     image {
//       url
//       altText
//     }
//   }
// `);

export const productBySlugQuery = graphql(`
    query ProductBySlug($slug: String!) {
      product(handle: $slug) {
        title
        handle
        media(first: 10) {
          nodes {
            __typename
            id
            ... on MediaImage {
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  `);

export async function getProducts() {
  const { data } = await shopifyClient(productsQuery);

  return data?.products?.edges?.map((edge) => edge.node);
}

export async function getProductBySlug(slug: string) {
  const { data } = await shopifyClient(productBySlugQuery, { slug });
  return data?.product;
}

export const getProductsServerFn = createServerFn().handler(() =>
  getProducts(),
);

export const getProductBySlugServerFn = createServerFn()
  .inputValidator(z.object({ slug: z.string() }))
  .handler(({ data: { slug } }) => getProductBySlug(slug));
