import { NextRequest, NextResponse } from "next/server";
import { connect, getDataSource } from "@/dbConfig/dataSource";
import { User } from "@/models/User";
import { LessThan } from "typeorm";

export async function POST(request: NextRequest) {
    try {
        // Ensure the connection is established
        await connect();

        const userRepository = getDataSource().getRepository(User);

        // Extract token from request body
        const { token } = await request.json();
        console.log("Printing Token inside VerifyEmail Route: ", token);

        // Find the user by verifyToken and check if the token is not expired
        const user = await userRepository.findOne({
            where: {
                verifyToken: token,
                verifyTokenExpiry: LessThan(new Date()),
            },
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid User Details",
            }, { status: 404 });
        }

        // Update user to mark as verified and clear the verifyToken
        user.isVerified = true;
        user.verifyToken = "";
        user.verifyTokenExpiry = new Date(0); // Set to a past date to clear expiry

        await userRepository.save(user);

        return NextResponse.json({
            success: true,
            message: "Email Verified Successfully",
        }, { status: 200 });

    } catch (err: any) {
        console.log("Internal Server Error while Verifying Email", err);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error while Verifying Email",
        }, { status: 500 });
    }
}
