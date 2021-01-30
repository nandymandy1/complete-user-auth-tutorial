import { Router } from "express";
import { DOMAIN } from "../constants";
import { Profile, User } from "../models";
import uploader from "../middlewares/uploader";
import { userAuth } from "../middlewares/auth-guard";

const router = Router();

/**
 * @description To create profile of the authenticated User
 * @type POST <multipart-form> request
 * @api /profiles/api/create-profile
 * @access Private
 */
router.post(
  "/api/create-profile",
  userAuth,
  uploader.single("avatar"),
  async (req, res) => {
    try {
      let { body, file, user } = req;
      let path = DOMAIN + file.path.split("uploads/")[1];
      let profile = new Profile({
        social: body,
        account: user._id,
        avatar: path,
      });
      await profile.save();
      return res.status(201).json({
        success: true,
        messgae: "Profile created successfully.",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        messgae: "Unable to create your profile.",
      });
    }
  }
);

/**
 * @description To Get the authenticated user's profile
 * @api /profiles/api/my-profile
 * @access Private
 * @type GET
 */
router.get("/api/my-profile", userAuth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ account: req.user._id }).populate(
      "account",
      "name email username"
    );
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Your profile is not available.",
      });
    }
    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Unable to get the profile.",
    });
  }
});

/**
 * @description To update autheticated user's profile
 * @type PUT <multipart-form> request
 * @api /profiles/api/update-profile
 * @access Private
 */
router.put(
  "/api/update-profile",
  userAuth,
  uploader.single("avatar"),
  async (req, res) => {
    try {
      let { body, file, user } = req;
      let path = DOMAIN + file.path.split("uploads/")[1];
      let profile = await Profile.findOneAndUpdate(
        { account: user._id },
        { social: body, avatar: path },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Your profile is now updated",
        profile,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Unable to get the profile.",
      });
    }
  }
);

/**
 * @description To get user's profile with the username
 * @api /profiles/api/update-profile
 * @access Public
 * @type GET
 */
router.get("/api/profile-user/:username", async (req, res) => {
  try {
    let { username } = req.params;
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    let profile = await Profile.findOne({ account: user._id });
    return res.status(200).json({
      profile: {
        ...profile.toObject(),
        account: user.getUserInfo(),
      },
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

export default router;
