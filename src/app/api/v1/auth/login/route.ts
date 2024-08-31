import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connect, getDataSource } from '@/dbConfig/dataSource';
import { User } from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    // Ensure the connection is established
    await connect();

    // Use the singleton instance
    const userRepository = getDataSource().getRepository(User);

    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Please Provide all Details',
      }, { status: 400 });
    }

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found !!',
      }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        success: false,
        message: 'Password does not match, Please Try Again !!',
      }, { status: 400 });
    }

    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Logged In Successfully',
    }, { status: 200 });

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;

  } catch (err: any) {
    console.log('Internal Server Error while Login: ', err);
    return NextResponse.json({
      success: false,
      message: 'Internal Server Error while login !!',
    }, { status: 500 });
  }
}
