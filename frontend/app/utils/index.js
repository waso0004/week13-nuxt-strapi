export const STRAPI_BASE_URL = import.meta.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
export const REVIEWS_API_URL = `${STRAPI_BASE_URL}/api/reviews?populate=*`;
