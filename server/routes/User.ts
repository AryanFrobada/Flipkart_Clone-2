import express from 'express';
import { deleteUser } from '../controllers/User';
// import { saveGoogleUser, getAllUsers } from '../controllers/User';
const {saveGoogleUser, getAllUsers} = require("../controllers/User")

const router = express.Router();

// Route to save Google user details
router.post('/saveGoogleUser', saveGoogleUser);

router.get('/getAllUsers', getAllUsers);

router.delete('/deleteUser/:id', deleteUser); // Route to delete a user by ID

export default router;
