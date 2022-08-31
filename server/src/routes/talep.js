import express from "express";
const router = express.Router();

import { verifyAccessToken } from "../helpers/jwt";

import Talep from "../controllers/talep";
// import cache from '../cache';

router.post(
	"/",
	verifyAccessToken,
	Talep.Create
);
router.get(
	"/:talep_id",
	// verifyAccessToken,
	// grantAccess('readAny', 'talep'),
	// Talep.route(),
	Talep.Get
);
// router.get('/', cache.route(), Talep.GetList);
router.get("/", Talep.GetTalep);
router.put("/:talep_id", Talep.Update);
router.delete("/:talep_id", Talep.Delete);

export default router;
