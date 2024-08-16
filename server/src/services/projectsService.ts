import { Project } from "../models/Project";

const getAll = () => Project.find();

const search = (search: string) => {
  const searchRegEx = new RegExp(search, "i");
  const projects = Project.find({ name: { $regex: searchRegEx } });
  return projects;
};

const getAllProjectsByCategory = (category: string) => Project.find({ category });

const getProjectById = (ProjectId: string) =>
  Project.findById(ProjectId).populate("comments");

export default {
  getAll,
  getProjectById,
  getAllProjectsByCategory,
  search,
};
