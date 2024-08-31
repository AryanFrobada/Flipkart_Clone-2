import { NextRequest, NextResponse } from "next/server";
import { connect, getDataSource } from "@/dbConfig/dataSource";
import { sendEmail } from "@/helpers/mailer";
import { User } from "@/models/User";
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
    try {
        // Ensure the connection is established
        await connect();

        const { firstName, lastName, email, password } = await request.json();

        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({
                success: false,
                message: "Please Enter all Details of User !!",
            }, { status: 400 });
        }

        const userRepository = getDataSource().getRepository(User);
        const existingUser = await userRepository.findOneBy({ email });

        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "User Already Exists !! Please try with a different account.",
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepository.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        const savedUser = await userRepository.save(newUser);
        console.log(savedUser);

        // Send Verification Mail
        await sendEmail({ email, emailType: 'VERIFY', userId: savedUser.id });

        return NextResponse.json({
            success: true,
            message: "Signup Successful !!",
        }, { status: 200 });

    } catch (err: any) {
        console.log("Internal Server Error in Sign-up !!", err);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error while Signing Up !!",
        }, { status: 500 });
    }
}
