export function getStrapiURL(path = '') {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api${path}${
      path.includes('?') ? '&' : '?'
    }populate=deep,3`;
  }
  
  // Helper to make GET requests to Strapi
  export async function fetchAPI(path) {
    try{
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
    }
    catch(error){
        console.log(error)
    }
  }