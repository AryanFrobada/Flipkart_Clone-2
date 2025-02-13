import { User } from '../models/User'; // Adjust the path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: User; // Extend the Request type to include user
    }
  }
}