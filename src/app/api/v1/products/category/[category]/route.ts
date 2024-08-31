import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
// http://localhost:3000/api/v1/products/category/laptops

export async function GET(request: NextRequest, {params}: {params: {category: string}}) {
    const baseUrl = process.env.DUMMYJSON_BASE_URL;
    try {
        // Extract the dynamic categoryName from the request URL
        const categoryName = params.category;
        if (!categoryName) {
            return NextResponse.json({
                success: false,
                message: "Category name is missing!",
            }, { status: 400 });
        }

        const response = await axios.get(`${baseUrl}/products/category/${categoryName}`);
        const products = response.data;

        return NextResponse.json({
            success: true,
            message: "Category-based products fetched successfully",
            data: products,
        }, { status: 200 });
    } catch (err: any) {
        console.log("Internal Server Error while fetching category details", err);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error while fetching category details",
        }, { status: 500 });
    }
}
