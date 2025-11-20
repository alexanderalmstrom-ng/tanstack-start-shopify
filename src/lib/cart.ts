import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { graphql } from "@/gql";
import shopifyClient from "@/integrations/shopify/client";

export const createCartServerFn = createServerFn()
  .inputValidator(
    z.object({
      lines: z.array(
        z.object({
          merchandiseId: z.string(),
          quantity: z.number().default(1),
        }),
      ),
    }),
  )
  .handler(async ({ data: { lines } }) => {
    const { data } = await shopifyClient(createCartMutation, {
      lines,
    });

    return data?.cartCreate?.cart;
  });

export const createCartMutation = graphql(`
mutation cartCreate($lines: [CartLineInput!]!) {
  cartCreate(
    input: {
      lines: $lines
    }
  ) {
    cart {
      id
      createdAt
      updatedAt
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      delivery {
        addresses {
            address {
                __typename
                ... on CartDeliveryAddress {
                    firstName
                    lastName
                    address1
                    address2
                    name
                    phone
                    zip
                    city
                    countryCode
                    provinceCode
                }
            }
        }
      }
      attributes {
        key
        value
      }
      # The estimated total cost of all merchandise that the customer will pay at checkout.
      cost {
        totalAmount {
          amount
          currencyCode
        }
        # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
        subtotalAmount {
          amount
          currencyCode
        }
        checkoutChargeAmount {
            amount
            currencyCode
        }
        subtotalAmountEstimated
        totalAmountEstimated
      }
    }
  }
}
`);
