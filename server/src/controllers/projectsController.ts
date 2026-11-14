import express from "express";
import asyncHandler from "express-async-handler";
import { Project } from "../models/Project";
import { sample_projects } from "../data";
import projectsService from "../services/projectsService";
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";
const router = express.Router();

router.get("/seed", isAuth, isAdmin, asyncHandler(async (req, res) => {
  const projectsCount = await Project.countDocuments();
  if (projectsCount > 0) {
    res.send("Seed is already done!");
    return;
  }

  await Project.create(sample_projects);
  res.send("Seed Is Done!");
}));

router.get("/delete", isAuth, isAdmin, asyncHandler(async (req, res) => {
  const projectsCount = await Project.countDocuments();
  if (projectsCount == 0) {
    res.send("Nothing to delete!");
    return;
  }

  await Project.deleteMany();
  res.send("Delete Is Done!");
}));

router.get("/", asyncHandler(async (req, res) => {
  const projects = await projectsService.getAll();
  res.send(projects);
}));

router.get("/:category", asyncHandler(async (req, res) => {
  const category = req.params.category;
  const projects = await projectsService.getAllProjectsByCategory(category);
  res.send(projects);
}));

router.get("/details/:projectId", asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;
  const project = await projectsService.getProjectById(projectId);
  res.send(project);
}));

export default router;
