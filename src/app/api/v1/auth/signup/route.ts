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
        let savedUser;

        if (existingUser) {
            if(existingUser.isVerified){
                return NextResponse.json({
                    success: false,
                    message: "User Already Exists with this Email !! Please try with a different account.",
                }, { status: 400 });
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUser.password = hashedPassword;
                
                savedUser = await userRepository.save(existingUser);
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = userRepository.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });
    
            savedUser = await userRepository.save(newUser);
            console.log(savedUser);
        }

        // Send Verification Mail
        await sendEmail({ email, emailType: 'VERIFY', userId: savedUser.id });

        return NextResponse.json({
            success: true,
            message: "Signup Successful !! A verification email has been sent.",
        }, { status: 200 });

    } catch (err: any) {
        console.log("Internal Server Error in Sign-up !!", err);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error while Signing Up !!",
        }, { status: 500 });
    }
}
