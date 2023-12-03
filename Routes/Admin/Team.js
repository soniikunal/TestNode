import express from "express";
const router = express.Router();
import Teams from "../../Models/UsersModel/Teams.js";
import * as dotenv from "dotenv";
import Permissions from "../../Models/Roles&Permission/Permissions.js";
import Roles from "../../Models/Roles&Permission/Roles.js";
dotenv.config();

router.post("/addTeam", async (req, res) => {
  const newTeam = new Teams({
    name: req.body.name,
    heads: req.body.heads,
  });

  try {
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/permission", async (req, res) => {
  const Permission = new Permissions({
    name: req.body.name,
  });

  try {
    const savedPermission = await Permission.save();
    res.status(201).json(savedPermission);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/role", async (req, res) => {
  const Role = new Roles({
    name: req.body.name,
    permissions : req.body.permissions
  });

  try {
    const savedRole = await Role.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as teamRoutes };
