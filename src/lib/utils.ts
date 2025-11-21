import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ProductsQuery } from "@/gql/graphql";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isServer() {
  return typeof window === "undefined";
}

type MediaNode =
  ProductsQuery["products"]["edges"][number]["node"]["media"]["nodes"][number];

export function isMediaImage(
  node: MediaNode,
): node is Extract<MediaNode, { __typename?: "MediaImage" }> {
  return node.__typename === "MediaImage";
}
