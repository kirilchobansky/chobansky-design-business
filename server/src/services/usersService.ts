import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { User, IUser } from "../models/User";
import { Project } from "../models/Project";

const SECRET = "ThatIsMyBestSecret";

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Cannot find email or password!");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Cannot find email or password!");
  }

  return generateToken(user);
};

const findOne = (email: string) => User.findOne({ email });

const register = async (user: any) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new Error("Email is already in use");
  }

  const createdUser = await User.create(user);
  return generateToken(createdUser);
};

function generateToken(user: IUser) {
  const payload = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  const accessToken = jwt.sign(payload, SECRET, { expiresIn: "3d" });

  return {
    id: user._id,
    email: user.email,
    username: user.username,
    address: user?.address,
    phone: user?.phone,
    isAdmin: user.isAdmin,
    accessToken,
  };
}

const likeProject = (projectId: Types.ObjectId, userId: Types.ObjectId) =>
  User.findByIdAndUpdate(userId, { $push: { favoriteProjects: projectId } });

const dislikeProject = (projectId: Types.ObjectId, userId: Types.ObjectId) =>
  User.findByIdAndUpdate(userId, { $pull: { favoriteProjects: projectId } });

const getUserById = (userId: Types.ObjectId) => User.findById(userId);

const updateUserDetails = async (
  userId: Types.ObjectId,
  username: string,
  email: string,
  address: string,
  phone: number
) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { username, email, address, phone },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found or update failed.");
  }

  return generateToken(updatedUser);
};

const deleteUserById = (userId: Types.ObjectId) =>
  User.findByIdAndDelete(userId);

const getLikedProjectsByUser = (userId: Types.ObjectId) =>
  User.findById(userId).populate("favoriteProjects").exec();

const search = (search: string) => {
  const searchRegEx = new RegExp(search, "i");
  const projects = Project.find({ name: { $regex: searchRegEx } });
  return projects;
};

const changePassword = async (
  userId: Types.ObjectId,
  oldPassword: string,
  newPassword: string
) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new Error("Cannot find user!");
  }

  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) {
    throw new Error("Wrong password!");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { password: newPassword },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("Failed to update password.");
  }

  return generateToken(updatedUser);
};

export default {
  login,
  register,
  findOne,
  likeProject,
  dislikeProject,
  getUserById,
  updateUserDetails,
  getLikedProjectsByUser,
  deleteUserById,
  search,
  changePassword,
};
