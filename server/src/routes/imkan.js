import express from "express";
const router = express.Router();

import Imkan from "../controllers/imkan";
// import cache from '../cache';

router.post(
	"/",
	Imkan.Create
);
router.get(
	"/:imkan_id",
	// verifyAccessToken,
	// grantAccess('readAny', 'imkan'),
	// Imkan.route(),
	Imkan.Get
);
// router.get('/', cache.route(), Imkan.GetList);
router.get("/", Imkan.GetImkan);
router.put("/:imkan_id", Imkan.Update);
router.delete("/:imkan_id", Imkan.Delete);

export default router;
