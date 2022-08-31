import Imkan from "../../models/imkan";
import Boom from "boom";
import ImkanSchema from "./validations";

const Create = async (req, res, next) => {
	const input = req.body;
	const { error } = ImkanSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		// input.photos = JSON.parse(input.photos);

		const imkan = new Imkan(input);
		const savedData = await imkan.save();

		res.json(savedData);
	} catch (e) {
		next(e);
	}
};

const Get = async (req, res, next) => {
	const { imkan_id } = req.params;

	if (!imkan_id) {
		return next(Boom.badRequest("Missing paramter (:imkan_id)"));
	}

	try {
		const imkan = await Imkan.findById(imkan_id);

		res.json(imkan);
	} catch (e) {
		next(e);
	}
};

const Update = async (req, res, next) => {
	const { imkan_id } = req.params;

	try {
		const updated = await Imkan.findByIdAndUpdate(imkan_id, req.body, {
			new: true,
		});

		res.json(updated);
	} catch (e) {
		next(e);
	}
};

const Delete = async (req, res, next) => {
	const { imkan_id } = req.params;

	try {
		const deleted = await Imkan.findByIdAndDelete(imkan_id);

		if (!deleted) {
			throw Boom.badRequest("Imkan not found.");
		}

		res.json(deleted);
	} catch (e) {
		next(e);
	}
};

const GetImkan = async (req, res, next) => {
	try {
		const imkanlar = await Imkan.find()
		res.status(200).json(imkanlar)
	} catch (e) {
		res.status(404).json({
			message: error.message
		})
	}
};

export default {
	Create,
	Get,
	Update,
	Delete,
	GetImkan,
};
