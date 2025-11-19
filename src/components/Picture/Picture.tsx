import type { ComponentProps } from "react";
import generateSrcSet from "./utils/generateSrcSet";

// Image size breakpoints from 640px to 2048px with 100vw fallback
const DEFAULT_IMAGE_SIZES = [
  320,
  640,
  768,
  1024,
  1280,
  1536,
  1920,
  2048,
  2560,
  "100vw",
] as const;

// Default fallback size for the img element src attribute
const DEFAULT_SIZE = 1920;

// Default image quality
const DEFAULT_QUALITY = 80;

const DEFAULT_FORMAT = "jpg";

// Default loading behavior for the img element
const DEFAULT_LOADING = "lazy";

type Size = (typeof DEFAULT_IMAGE_SIZES)[number];

export type PictureProps = ComponentProps<"picture"> & {
  src: ComponentProps<"img">["src"];
  mobileSrc?: ComponentProps<"img">["src"];
  alt?: ComponentProps<"img">["alt"];
  sizes?: ComponentProps<"img">["sizes"];
  loading?: ComponentProps<"img">["loading"];
  quality?: number;
  imageSizes?: readonly (Size | string)[] | string;
  format?: "jpg" | "webp" | "avif";
};

/**
 * A picture component that allows you to display an image with different formats and sizes.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture} - MDN documentation for the picture element
 * @see {@link https://www.contentful.com/developers/docs/references/images-api/} - Contentful's image API documentation
 */

export default function Picture({
  src,
  mobileSrc,
  alt = "",
  loading = DEFAULT_LOADING,
  imageSizes = DEFAULT_IMAGE_SIZES,
  quality = DEFAULT_QUALITY,
  format = DEFAULT_FORMAT,
  sizes,
  ...props
}: PictureProps) {
  return (
    <picture {...props}>
      {mobileSrc && (
        <>
          <PictureSourceElement
            src={mobileSrc}
            format="avif"
            quality={quality}
            imageSizes={imageSizes}
            media="(max-width: 768px)"
            sizes={sizes}
          />
          <PictureSourceElement
            src={mobileSrc}
            format="webp"
            quality={quality}
            imageSizes={imageSizes}
            media="(max-width: 768px)"
            sizes={sizes}
          />
        </>
      )}
      <PictureSourceElement
        src={src}
        format="avif"
        quality={quality}
        imageSizes={imageSizes}
        media={mobileSrc ? "(min-width: 768px)" : undefined}
        sizes={sizes}
      />
      <PictureSourceElement
        src={src}
        format="webp"
        quality={quality}
        imageSizes={imageSizes}
        media={mobileSrc ? "(min-width: 768px)" : undefined}
        sizes={sizes}
      />
      <PictureImgElement
        src={src}
        alt={alt}
        loading={loading}
        format={format}
        quality={quality}
        imageSizes={imageSizes}
        sizes={sizes}
      />
    </picture>
  );
}

function PictureSourceElement({
  src,
  format,
  quality,
  imageSizes,
  media,
  ...props
}: Omit<ComponentProps<"source">, "src"> & {
  src?: PictureProps["src"];
  format?: PictureProps["format"];
  quality?: PictureProps["quality"];
  imageSizes?: PictureProps["imageSizes"];
}) {
  const type = format === "jpg" ? "image/jpeg" : `image/${format}`;
  const srcSet = generateSrcSet({
    src,
    format,
    imageSizes:
      typeof imageSizes === "string" ? DEFAULT_IMAGE_SIZES : imageSizes,
    quality,
  });

  return <source srcSet={srcSet} type={type} media={media} {...props} />;
}

function PictureImgElement({
  src,
  alt,
  format,
  quality,
  imageSizes,
  sizes,
  ...props
}: ComponentProps<"img"> & {
  format?: PictureProps["format"];
  quality?: PictureProps["quality"];
  imageSizes?: PictureProps["imageSizes"];
}) {
  if (!src) {
    return null;
  }

  const srcSet = generateSrcSet({
    src,
    format,
    imageSizes: typeof imageSizes === "string" ? [imageSizes] : imageSizes,
    quality,
  });

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="h-full w-full object-cover"
      src={`${src}${src.includes("?") ? "&" : "?"}width=${DEFAULT_SIZE}?format=${format}&quality=${quality}`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      {...props}
    />
  );
}
