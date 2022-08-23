export function getStrapiMedia(media) {
    const imageUrl = media?.startsWith('/')
      ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${media}`
      : media;
    return imageUrl;
  }
  