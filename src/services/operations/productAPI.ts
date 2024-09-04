import { apiConnector } from '../apiconnector';
import { productEndpoints } from '../apis';
import axios from 'axios'

const {
    GET_ALL_PRODUCTS_API,
    GET_PRODUCT_BY_ID_API,
    GET_ALL_CATEGORIES_API,
    GET_PRODUCT_BY_CATEGORY_API,
    SEARCH_PRODUCTS_API
} = productEndpoints;

export async function fetchAllCategories() {
  try {
    const response = await apiConnector('GET', GET_ALL_CATEGORIES_API);
    console.log("GET_ALL_CATEGORIES_API RESPONSE.....", response);

    if(!response.data.success){
        throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}


export const fetchCategoryImageBySlug = async (slug) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/category/${slug}`);
      const products = response.data.products
      console.log("Printing Products", products);
      
      // Return the first product's image if available
      if (products && products.length > 0) {
        if(slug === 'fragrances'){
            return products[1].thumbnail;
        }
        return products[0].thumbnail;  // Assuming 'thumbnail' holds the image URL
      }
      return null;
    } catch (error) {
      console.error(`Error fetching image for category ${slug}:`, error);
      return null;
    }
  };
  