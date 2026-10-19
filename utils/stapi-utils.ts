
import { Link } from "@/i18n/navigation";
import { createElement } from "react";
import qs from "qs";

const BASE_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://surf-camp-strapi.onrender.com/"
).replace(/\/+$/, "");

const DEFAULT_REVALIDATE = 3600;

/**
 * Fetch public, read-only Strapi data using Next.js server caching.
 *
 * IMPORTANT: Call this from Server Components or other server-side
 * code, not directly from Client Components.
 */
async function strapiGet(
  url: string,
  revalidate = DEFAULT_REVALIDATE
) {
  const response = await fetch(url, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(
      `Strapi request failed: ${response.status} ${url}`
    );
  }

  return response.json();
}

/**
 * Normalizes image URLs returned by Strapi.
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

  const repairedUrl = cleanedUrl.replace(
    /^(https?):\/{0,1}(?!\/)/i,
    "$1://"
  );

  if (/^https?:\/\//i.test(repairedUrl)) {
    return repairedUrl;
  }

  if (repairedUrl.startsWith("//")) {
    return `https:${repairedUrl}`;
  }

  return `${BASE_URL}/${repairedUrl.replace(/^\/+/, "")}`;
}

export async function fetchDataFromStrapi(
  route: string,
  revalidate = DEFAULT_REVALIDATE
) {
  const normalizedRoute = route.replace(/^\/+/, "");
  const apiRoute = normalizedRoute.startsWith("api/")
    ? normalizedRoute
    : `api/${normalizedRoute}`;

  const url = `${BASE_URL}/${apiRoute}`;

  try {
    const response = await strapiGet(url, revalidate);
    return response.data;
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
    "blog-articles?populate=deep",
    3600
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
  const event = await strapiGet(
    `${BASE_URL}/api/events/${encodeURIComponent(String(eventId))}`,
    300
  );

  return processEventData(event.data);
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
  // Round down to a five-minute interval so identical requests
  // can share the same cache entry instead of generating a new URL
  // on every render.
  const now = new Date();
  now.setUTCMinutes(Math.floor(now.getUTCMinutes() / 5) * 5, 0, 0);

  const queryObject: any = {
    pagination: {
      start: 0,
      limit: 50,
    },
    sort: ["startingDate:asc"],
    filters: {
      startingDate: {
        $gte: now.toISOString(),
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
    const response = await strapiGet(
      `${BASE_URL}/api/events?${query}`,
      300
    );

    return (response.data ?? [])
      .filter(
        (event: any) =>
          new Date(event.attributes?.startingDate).getTime() >=
          Date.now()
      )
      .slice(0, 12)
      .map((event: any) => processEventData(event));
  } catch (err) {
    console.error("fetchAllEvents failed:", err);
    return [];
  }
}
