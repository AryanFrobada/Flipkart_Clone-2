import { apiConnector } from "../apiconnector";

export async function saveGoogleUser(userId: any, email: string, firstName: string, lastName: string) {
    try {
      const response = await apiConnector('POST', `http://localhost:4000/api/v1/users/saveGoogleUser`, {
        userId,
        email,
        firstName,
        lastName,
      });
      console.log("UserID in authAPI: ", userId);
      console.log("SAVE_GOOGLE_USER_API RESPONSE.....", response);
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      return response.data;
    } catch (err) {
      console.log("Error in saving Google user...", err);
      throw err;
    }
  }