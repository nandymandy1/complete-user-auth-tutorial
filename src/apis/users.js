import { Router } from "express";

const router = Router();

/**
 * @description To create a new User Account
 * @api /users/api/register
 * @access Public
 * @type POST
 */

/**
 * @description To verify email
 * @api /users/verify-now/:verificationCode
 * @access Restricted via email
 * @type GET
 */

/**
 * @description To authenticate an user
 * @api /users/api/authenticate
 * @access Public
 * @type POST
 */

/**
 * @description To reset password
 * @api /users/api/forgot-password
 * @access Public
 * @type POST
 */

/**
 * @description To
 * @api /users/reset-password/:resetPasswordToken
 * @access Restricted Access via email
 * @type GET
 */

export default router;
