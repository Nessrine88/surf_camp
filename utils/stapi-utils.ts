import axios from "axios";
import Link from "next/link";
import { createElement, ReactNode } from "react";

const BASE_URL = (process.env.STRAPI_URL || "http://127.0.0.1:1337").replace(
  /\/$/,
  "",
);

export async function fetchDataFromStrapi(route: string) {
  const url = `${BASE_URL}/api/${route}`;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Strapi fetch error:", error);
    throw new Error(`Could not fetch data from ${url}`, { cause: error });
  }
}

function createInfoBlockButton(buttonData?: any) {
  if (!buttonData) return null;
  const { slug, text, colour } = buttonData;

  return createElement(
    Link,
    {
      href: `/${slug}`,
      className: `btn btn--medium${colour ? ` btn--${colour}` : ""}`,
    },
    text,
  );
}

export function processInfoBlocks(data: any) {
  const infoBlocksRaw = data?.attributes?.info_blocks?.data;

  return (
    infoBlocksRaw?.map((infoBlock: any) => {
      const attributes = infoBlock.attributes;
      const imageUrl = attributes?.image?.data?.attributes?.url;

      return {
        ...attributes,
        id: infoBlock.id,
        imageSrc: imageUrl
          ? imageUrl.startsWith("http")
            ? imageUrl
            : `${BASE_URL}${imageUrl}`
          : undefined,
        button: createInfoBlockButton(attributes?.button),
      };
    }) ?? []
  );
}

export async function fetchBlogArticles() {
  const blogData = await fetchDataFromStrapi("blog-articles?populate=deep,5");

  const processBlogArticles = blogData.map(processBlogArticle);
  processBlogArticles.sort(
    (a: any, z: any) =>
      new Date(z.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return processBlogArticles;
}

function processBlogArticle(article: any) {
  return {
    ...article.attributes,
    id: article.id,
    featuredImage:
      BASE_URL + article.attributes?.featuredImage.data.attributes?.url,
  };
}



export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);
}

export function extractImageUrl(imageData:any) {
  return BASE_URL + imageData.data?.attributes?.url;
}