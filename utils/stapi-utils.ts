
import axios from "axios";
import { Link } from "@/i18n/navigation";
import { createElement } from "react";
import qs from "qs";

const BASE_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://surf-camp-strapi.onrender.com/"
).replace(/\/+$/, "");

/**
 * Normalizes image URLs returned by Strapi.
 *
 * - Keeps valid absolute URLs unchanged.
 * - Repairs malformed protocols such as https//.
 * - Handles protocol-relative URLs.
 * - Prepends BASE_URL only to relative paths.
 */
function normalizeImageUrl(
  url?: string | null
): string | undefined {
  if (!url || typeof url !== "string") {
    return undefined;
  }

  const cleanedUrl = url.trim();

  if (!cleanedUrl) {
    return undefined;
  }

  // Repair malformed URLs such as:
  // https//res.cloudinary.com/...
  // http//res.cloudinary.com/...
  const repairedUrl = cleanedUrl.replace(
    /^(https?):\/{0,1}(?!\/)/i,
    "$1://"
  );

  // Already an absolute HTTP(S) URL.
  // Do not prepend the Strapi base URL.
  if (/^https?:\/\//i.test(repairedUrl)) {
    return repairedUrl;
  }

  // Protocol-relative URL, e.g. //res.cloudinary.com/...
  if (repairedUrl.startsWith("//")) {
    return `https:${repairedUrl}`;
  }

  // Relative URL, e.g. /uploads/image.png
  return `${BASE_URL}/${repairedUrl.replace(/^\/+/, "")}`;
}

export async function fetchDataFromStrapi(route: string) {
  const url = `${BASE_URL}/api/${route}`;

  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Strapi fetch error:", error);
    throw new Error(`Could not fetch data from ${url}`, {
      cause: error,
    });
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
    text
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
        imageSrc: normalizeImageUrl(imageUrl),
        button: createInfoBlockButton(attributes?.button),
      };
    }) ?? []
  );
}

export async function fetchBlogArticles() {
  const blogData = await fetchDataFromStrapi(
    "blog-articles?populate=deep"
  );

  const processBlogArticles = blogData.map(processBlogArticle);

  processBlogArticles.sort(
    (a: any, z: any) =>
      new Date(z.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  );

  return processBlogArticles;
}

function processBlogArticle(article: any) {
  if (!article) {
    throw new Error("Strapi returned an undefined blog article");
  }

  const attributes = article.attributes ?? {};
  const imageUrl =
    attributes.featuredImage?.data?.attributes?.url;

  return {
    ...attributes,
    id: article.id,
    featuredImage: normalizeImageUrl(imageUrl) ?? null,
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

export function extractImageUrl(imageData: any) {
  const imageUrl = imageData?.data?.attributes?.url;

  return normalizeImageUrl(imageUrl);
}

export async function fetchIndividualEvent(eventId: any) {
  const event = await axios.get(
    `${BASE_URL}/api/events/${eventId}`
  );

  return processEventData(event.data.data);
}

function processEventData(event: any) {
  if (!event) {
    throw new Error("Strapi returned an undefined event");
  }

  const attributes = event.attributes ?? {};
  const imageUrl = attributes.image?.data?.attributes?.url;

  return {
    ...attributes,
    image: normalizeImageUrl(imageUrl) ?? null,
    id: event.id,
  };
}

export function generateSignupPayload(
  formData: any,
  eventId: any
) {
  if (!eventId) {
    return {
      data: {
        ...formData,
        isGeneralInterest: true,
      },
    };
  }

  return {
    data: {
      ...formData,
      event: {
        connect: [eventId],
      },
    },
  };
}

function createEventQuery(eventIdToExclude: any = null): string {
  const queryObject: any = {
    pagination: {
      start: 0,
      limit: 12,
    },
    sort: ["startingDate:asc"],
    filters: {
      startingDate: {
        $gte: new Date(),
      },
    },
    populate: {
      image: {
        populate: "*",
      },
    },
  };

  if (eventIdToExclude) {
    queryObject.filters.id = {
      $ne: eventIdToExclude,
    };
  }

  return qs.stringify(queryObject, {
    encodeValuesOnly: true,
  });
}

export async function fetchAllEvents(
  eventToExclude: any = null
) {
  const query = createEventQuery(eventToExclude);

  try {
    const response = await axios.get(
      `${BASE_URL}/api/events?${query}`
    );

    return response.data.data.map((event: any) =>
      processEventData(event)
    );
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "fetchAllEvents failed:",
        err.response?.status,
        err.response?.data ?? err.message
      );
    } else {
      console.error(err);
    }

    return [];
  }
}
