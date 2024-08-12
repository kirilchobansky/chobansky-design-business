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

// router.get("/tags/:tagName", async (req, res) => {
//   const tagName = req.params.tagName;
//   const foods = await foodsService.getAllFoodsByTag(tagName);
//   res.send(foods);
// });

router.get("/details/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const project = await projectsService.getProjectById(projectId);
  res.send(project);
});

export default router;
