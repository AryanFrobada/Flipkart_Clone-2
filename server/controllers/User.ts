import { Request, Response } from 'express';
import { getDataSource } from '../config/dataSource';
import { User } from '../models/User';

// Controller to handle saving Google user data
export const saveGoogleUser = async (req: Request, res: Response) => {
  const dataSource = getDataSource();
  const userRepository = dataSource.getRepository(User);

  try {
    const { userId, email, firstName, lastName } = req.body;
    console.log("Printing GoogleID in backend: ", userId);

    // Check if the user already exists in the database
    let user = await userRepository.findOneBy({ email });

    // If user does not exist, create a new user
    if (!user) {
      user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = ''; // Password is not used for Google sign-in
      user.isVerified = true; // Google users are verified by default
      user.googleId = userId;
      await userRepository.save(user);
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    }

    user.googleId = userId;
    await userRepository.save(user);
    // If the user exists, return the user data
    return res.status(200).json({
      success: true,
      message: "User already exists",
      data: user,
    });

  } catch (err) {
    console.log("Internal Server Error while saving Google User !!", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while saving Google User !!",
    });
  }
};



export const getAllUsers = async (req: Request, res: Response) => {
    const dataSource = getDataSource();
    const userRepository = dataSource.getRepository(User);
  
    try {
      // Fetch all users from the database
      const users = await userRepository.find();
  
      // If no users are found
      if (!users || users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No users found",
        });
      }
  
      // Return all users
      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (err) {
      console.log("Error fetching users:", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };




  // Controller function to delete a user based on their ID
export const deleteUser = async (req: Request, res: Response) => {
    const dataSource = getDataSource();
    const userRepository = dataSource.getRepository(User);
  
    try {
      // Get the user ID from the request parameters
      const { id } = req.params;
  
      // Find the user by ID
      const user = await userRepository.findOneBy({ id: parseInt(id) });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Delete the user
      await userRepository.remove(user);
  
      // Respond with success
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error while deleting user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  