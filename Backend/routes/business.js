import express from "express";
import {
  createBusiness,
  editBusiness,
  deleteBusiness,
  getAllBusinesses,
  getUserBusinesses,
} from "../controllers/business.js";

const router = express.Router();

router.post("/", createBusiness);
router.post("/edit", editBusiness);
router.post("/delete", deleteBusiness);
router.post("/get", getUserBusinesses);

export default router;
