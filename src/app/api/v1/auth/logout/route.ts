import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dataSource";

export async function GET(request: NextRequest) {
    try {
        // Ensure the database connection is established
        await connect();

        const response = NextResponse.json({
            success: true,
            message: "Logged Out Successfully !!",
        }, { status: 200 });

        // Clear the token cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    } catch (err: any) {
        console.log("Internal Server Error while Logging out !!", err);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error while Logging out !!",
        }, { status: 500 });
    }
}
