import { Project } from "../models/Project";

const getAll = () => Project.find();

// const search = (search: string) => {
//   const searchRegEx = new RegExp(search, "i");
//   const projects = Project.find({ name: { $regex: searchRegEx } });
//   return projects;
// };

// const getAllTags = async () => {
//   const tags = await Project.aggregate([
//     {
//       $unwind: "$tags",
//     },
//     {
//       $group: {
//         _id: "$tags",
//         count: { $sum: 1 },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         name: "$_id",
//         count: "$count",
//       },
//     },
//   ]).sort({ count: -1 });

//   const all = {
//     name: "All",
//     count: await Project.countDocuments(),
//   };

//   tags.unshift(all);
//   return tags;
// };

// const getAllProjectsByTag = (tag: string) => Project.find({ tags: tag });

const getProjectById = (ProjectId: string) =>
  Project.findById(ProjectId).populate("comments");

export default {
  getAll,
  getProjectById,
  //   search,
  //   getAllTags,
  //   getAllProjectsByTag,
};
