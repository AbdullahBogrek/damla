import express from "express";
const router = express.Router();

import Help from "../controllers/help";
// import cache from '../cache';

import grantAccess from "../middlewares/grantAccess";
import { verifyAccessToken } from "../helpers/jwt";

router.post(
	"/",
	verifyAccessToken,
	grantAccess("createAny", "help"),
	Help.Create
);
router.get(
	"/:help_id",
	// verifyAccessToken,
	// grantAccess('readAny', 'help'),
	// cache.route(),
	Help.Get
);
// router.get('/', cache.route(), Help.GetList);
router.get("/", Help.GetList);
router.put("/:help_id", Help.Update);
router.delete("/:help_id", Help.Delete);

export default router;