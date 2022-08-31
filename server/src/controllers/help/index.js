import Help from "../../models/help";
import Boom from "boom";
import HelpSchema from "./validation";

const Create = async (req, res, next) => {
	const input = req.body;
	const { error } = HelpSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		input.photos = JSON.parse(input.photos);

		const help = new Help(input);
		const savedData = await help.save();

		res.json(savedData);
	} catch (e) {
		next(e);
	}
};

const Get = async (req, res, next) => {
	const { help_id } = req.params;

	if (!help_id) {
		return next(Boom.badRequest("Missing paramter (:help_id)"));
	}

	try {
		const help = await Help.findById(help_id);

		res.json(help);
	} catch (e) {
		next(e);
	}
};

const Update = async (req, res, next) => {
	const { help_id } = req.params;

	try {
		const updated = await Help.findByIdAndUpdate(help_id, req.body, {
			new: true,
		});

		res.json(updated);
	} catch (e) {
		next(e);
	}
};

const Delete = async (req, res, next) => {
	const { help_id } = req.params;

	try {
		const deleted = await Help.findByIdAndDelete(help_id);

		if (!deleted) {
			throw Boom.badRequest("Help not found.");
		}

		res.json(deleted);
	} catch (e) {
		next(e);
	}
};

const limit = 12;
const GetList = async (req, res, next) => {
	let { page } = req.query;

	if (page < 1) {
		page = 1;
	}

	const skip = (parseInt(page) - 1) * limit;

	try {
		const helps = await Help.find({})
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		res.json(helps);
	} catch (e) {
		next(e);
	}
};

export default {
	Create,
	Get,
	Update,
	Delete,
	GetList,
};
