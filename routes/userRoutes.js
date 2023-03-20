import express from 'express';
import { deletUser } from '../client/src/redux/actions/userActions.js';
import {
  getUserDetails,
  getUsers,
  login,
  logout,
  registerUser,
  updateUser,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/users/register').post(registerUser);
router.route('/user/login').post(login);
router.route('/user/logout').get(logout);

router.route('/admin/users').get(protect, authorizePermissions(true), getUsers);

router
  .route('/admin/users/:id')
  .get(protect, authorizePermissions(true), getUserDetails)
  .patch(protect, authorizePermissions(true), updateUser)
  .delete(protect, authorizePermissions(true), deletUser);

export default router;
