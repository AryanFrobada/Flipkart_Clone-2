import { Request, Response } from 'express';
const axios = require("axios");
require("dotenv").config();

// http://localhost:4000/api/v1/products/getAllProducts
exports.getAllProducts = async (req: Request, res: Response) => {
  const baseUrl = process.env.DUMMYJSON_BASE_URL;
  try {
    const response = await axios.get(`${baseUrl}/products`);
    const products = response.data;

    return res.status(200).json({
      success: true,
      message: "Products Fetched Successfully",
      data: products,
    });
  } catch (err: any) {
    console.error("Internal Server Error while fetching products!", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while fetching products",
    });
  }
};


// http://localhost:4000/api/v1/products/getProductByid/:id
exports.getProductById = async (req: Request, res: Response) => {
    const baseUrl = process.env.DUMMYJSON_BASE_URL;
    try{
        const productId = req.params.id;
        if (!productId) {
          return res.status(400).json({
            success: false,
            message: "Product Id is Missing !!",
          });
        }
    
        const response = await axios.get(`${baseUrl}/products/${productId}`);
        const product = response.data;
    
        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product Does not Exist",
          });
        }
    
        return res.status(200).json({
          success: true,
          message: "Product Details Fetched Successfully",
          data: product,
        })
    } catch(err: any){
        console.error("Internal Server Error while fetching product details by ID!", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while fetching product details by ID",
        });
    }
};


// http://localhost:4000/api/v1/products/getProductByCategory/:categoryName
exports.getProductByCategory = async(req: Request, res: Response) => {
    const baseUrl = process.env.DUMMYJSON_BASE_URL;
    try{
        const categoryName = req.params.category;
        // const categoryName = req.body();
        if (!categoryName) {
            return res.status(400).json({
                success: false,
                message: 'Category name is missing!',
            });
        }

        const response = await axios.get(`${baseUrl}/products/category/${categoryName}`);
        // console.log("Printing Response in backend product bt category: ", response);
        const products = response.data;

        // console.log("Printing Products in backend !!", products);

        return res.status(200).json({
            success: true,
            message: 'Category-based products fetched successfully',
            data: products,
        });
    } catch(err: any){
        console.error("Internal Server Error while fetching products by category!", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while fetching product details by category !!",
        });
    }
}

// http://localhost:4000/api/v1/products/searchProducts?q=Query
exports.searchProducts = async(req: Request, res: Response) => {
    const baseUrl = process.env.DUMMYJSON_BASE_URL;
    try{
        const query = req.query.q as string;
        if(!query){
            return res.status(400).json({
                success: false,
                message: "Query not found !!",
            });
        }

        const response = await axios.get(`${baseUrl}/products/search?q=${query}`);
        const result = response.data;
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `No Products found for query ${query}`,
            });
        }

        return res.status(200).json({
            success: true,
            message: `Products found for query ${query}`,
            data: result,
        });
    } catch(err: any){
        console.error("Internal Server Error while searching for Products...", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while searching for Products...",
        });
    }
}

// http://localhost:4000/api/v1/products/getAllCategories
exports.getAllCategories = async(req: Request, res: Response) => {
  const baseUrl = process.env.DUMMYJSON_BASE_URL;
  try{
    const response = await axios.get(`${baseUrl}/products/categories`);
    const result = response.data;
    if(!result){
      return res.status(400).json({
        success: false,
        message: "No Categories found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
  } catch(err: any){
    console.error("Internal Server Error while fetching all categories...", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while fetching all categories...",
    });
  }
}
