// http://localhost:3000/api/v1/products/search?q=yourSearchQuery
// Query Parameter approach
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const baseUrl = process.env.DUMMYJSON_BASE_URL;
    try{
        const {searchParams} = new URL(request.url);
        const query = searchParams.get('q');
        if(!query){
            return NextResponse.json({
                success: false,
                message: "Query not Found...",
            }, {status: 400});
        }

        const response = await axios.get(`${baseUrl}/products/search?q=${query}`);
        const result = response.data;
        if(!result){
            return NextResponse.json({
                success: false,
                message: `No Products found for query ${query}`,
            }, {status: 400});
        }

        return NextResponse.json({
            success: true,
            message: `Products found for query ${query}`,
            data: result,
        }, {status: 200});
    } catch(err: any){
        console.log("Internal Server Error while searching for products...");
        return NextResponse.json({
            success: false,
            message: "Internal Server Error while searching for products",
        }, {status: 500});
    }
}