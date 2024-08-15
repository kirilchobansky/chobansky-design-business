import express from "express";
import { Project } from "../models/Project";
import { sample_projects } from "../data";
import projectsService from "../services/projectsService";
const router = express.Router();

router.get("/seed", async (req, res) => {
  const commentsCount = await Project.countDocuments();
  if (commentsCount > 0) {
    res.send("Seed is already done!");
    return;
  }

  await Project.create(sample_projects);
  res.send("Seed Is Done!");
});

router.get("/delete", async (req, res) => {
  const commentsCount = await Project.countDocuments();
  if (commentsCount == 0) {
    res.send("Nothing to delete!");
    return;
  }

  await Project.deleteMany();
  res.send("Delete Is Done!");
});





router.get("/", async (req, res) => {
  const projects = await projectsService.getAll();
  res.send(projects);
});

// router.get("/search/:searchName", async (req, res) => {
//   const searchName = req.params.searchName;
//   const foods = await foodsService.search(searchName);
//   res.send(foods);
// });

// router.get("/tags", async (req, res) => {
//   const tags = await foodsService.getAllTags();
//   res.send(tags);
// });

router.get("/:category", async (req, res) => {
  const category = req.params.category;
  const projects = await projectsService.getAllProjectsByCategory(category);
  res.send(projects);
});

router.get("/details/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await projectsService.getProjectById(projectId);
  res.send(project);
});

export default router;
