// http://localhost:3000/api/v1/products/id
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Path parameter approach
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const baseUrl = process.env.DUMMYJSON_BASE_URL;
    try {
        const productId = params.id;
        if (!productId) {
            return NextResponse.json({
                success: false,
                message: "Product Id is Missing !!",
            }, { status: 400 });
        }

        const response = await axios.get(`${baseUrl}/products/${productId}`);
        const product = response.data;
        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product Does not Exist",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Product Details Fetched Successfully",
            data: product,
        }, { status: 200 });

    } catch (err: any) {
        console.error("Internal Server Error while fetching Specific Product. ", err);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error while fetching Specific Product...",
        }, { status: 500 });
    }
}
