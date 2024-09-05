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


export async function fetchProductById(id: string) {
  try{
    const response = await apiConnector('GET', `http://localhost:4000/api/v1/products/getProductById/${id}`);
    console.log("GET_PRODUCT_BY_ID_API RESPONSE.....", response);

    if(!response.data.success){
      throw new Error(response.data.message);
    }

    console.log("Printing Product Details: ", response.data.data);
    return response.data.data;
  } catch(err){
    console.error("Error fetching product by ID:", err);
    throw err;
  }
}


export async function fetchProductsOfCategories(slug: string) {
    try{
        const response = await apiConnector('GET', `http://localhost:4000/api/v1/products/getProductByCategory/${slug}`);
        console.log("GET_PRODUCT_BY_CATEGORY_API RESPONSE.....", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        console.log("Printing Product Array: ", response.data.data.products);

        return response.data.data.products;
    } catch(err){
        console.log("Error fetching category products !!", err);
        throw err;
    }
}


export const fetchCategoryImageBySlug = async (slug) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/category/${slug}`);
      const products = response.data.products
    //   console.log("Printing Products", products);
      
      if (products && products.length > 0) {
        if(slug === 'fragrances'){
            return products[1].thumbnail;
        }
        return products[0].thumbnail; 
      }
      return null;
    } catch (error) {
      console.error(`Error fetching image for category ${slug}:`, error);
      return null;
    }
  };
  