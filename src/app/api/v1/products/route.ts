// http://localhost:3000/api/v1/products
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest){
    const baseUrl = process.env.DUMMYJSON_BASE_URL;
    try{
        const res = await axios.get(`${baseUrl}/products`);
        const products = res.data;

        return NextResponse.json({
            success: true,
            message: "Products Fetched Successfully",
            data: products,
        }, {status: 200});
    } catch(err: any){
        console.log("Internal Server Error while fetching products !", err);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error while fetching products",
        }, {status: 500});
    }
}