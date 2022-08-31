import Talep from "../../models/talep";
import Boom from "boom";
import TalepSchema from "./validations";

const Create = async (req, res, next) => {
	const input = req.body;
	const { error } = TalepSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		// input.photos = JSON.parse(input.photos);

		const talep = new Talep(input);
		const savedData = await talep.save();

		res.json(savedData);
	} catch (e) {
		next(e);
	}
};

const Get = async (req, res, next) => {
	const { talep_id } = req.params;

	if (!talep_id) {
		return next(Boom.badRequest("Missing paramter (:talep_id)"));
	}

	try {
		const talep = await Talep.findById(talep_id);

		res.json(talep);
	} catch (e) {
		next(e);
	}
};

const Update = async (req, res, next) => {
	const { talep_id } = req.params;

	try {
		const updated = await Talep.findByIdAndUpdate(talep_id, req.body, {
			new: true,
		});

		res.json(updated);
	} catch (e) {
		next(e);
	}
};

const Delete = async (req, res, next) => {
	const { talep_id } = req.params;

	try {
		const deleted = await Talep.findByIdAndDelete(talep_id);

		if (!deleted) {
			throw Boom.badRequest("Talep not found.");
		}

		res.json(deleted);
	} catch (e) {
		next(e);
	}
};

const GetTalep = async (req, res, next) => {
	try {
		const talepler = await Talep.find()
		res.status(200).json(talepler)
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
	GetTalep,
};
