import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define an interface for the user object if you haven't already
interface User {
  id: string;
  email: string;
  // Add other properties if necessary
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // const token = req.headers['authorization']?.split(' ')[1]; // Get token from Bearer header

  // if (!token) {
  //   return res.status(401).json({ success: false, message: "Access token required" });
  // }

  // jwt.verify(token, process.env.NEXTAUTH_SECRET!, (err, decoded, req) => {
  //   if (err) {
  //     return res.status(403).json({ success: false, message: "Invalid token" });
  //   }

  //   // Ensure the `decoded` object is properly typed
  //   req.user = decoded as User; // Attach user to request object
  //   next();
  // });
};
