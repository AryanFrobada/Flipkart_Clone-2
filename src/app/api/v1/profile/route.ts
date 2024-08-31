import { connect, getDataSource } from "@/dbConfig/dataSource";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        // Ensure the connection is established
        await connect();

        const userRepository = getDataSource().getRepository(User);

        // Decode the token to get the userId
        const userId = await getDataFromToken(request);

        // Find the user by userId
        const user = await userRepository.findOne({
            where: { id: userId },
            select: ["firstName", "lastName", "email", "isVerified"]  // Exclude sensitive fields
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Profile Data Fetched Successfully",
            data: user,
        }, { status: 200 });

    } catch (err: any) {
        console.log("Internal Server Error while fetching profile details", err);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error while fetching profile details",
        }, { status: 500 });
    }
}


export async function PUT(request: NextRequest) {
    try {
        // Ensure the connection is established
        await connect();
        const userRepository = getDataSource().getRepository(User);

        // Decode the token to get the userId
        const userId = await getDataFromToken(request);

        // Get the request body data
        const { firstName, lastName } = await request.json();

        // Find the user by userId
        const user = await userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        // Update the user's profile details
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;

        await userRepository.save(user);

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
        }, { status: 200 });

    } catch (err: any) {
        console.log("Internal Server Error while updating profile", err);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error while updating profile",
        }, { status: 500 });
    }
}