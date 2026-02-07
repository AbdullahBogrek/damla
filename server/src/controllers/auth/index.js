import Boom from "boom";
import bcrypt from "bcrypt";
import User from "../../models/user";

import {
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
} from "../../helpers/jwt";

import { registerSchema, loginSchema } from "./validations";
import redis from "../../clients/redis";

const Register = async (req, res, next) => {
	const input = req.body;

	const { error } = registerSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		const isExists = await User.findOne({ email: input.email });

		if (isExists) {
			return next(Boom.conflict("Bu e-posta adresi zaten kullanılıyor."));
		}

		const user = new User(input);
		const data = await user.save();
		const userData = data.toObject();

		delete userData.password;
		delete userData.__v;

		const accessToken = await signAccessToken({
			user_id: user._id,
			role: user.role,
		});
		const refreshToken = await signRefreshToken(user._id);

		res.json({
			user: userData,
			accessToken,
			refreshToken,
		});
	} catch (e) {
		next(e);
	}
};

const Login = async (req, res, next) => {
	const input = req.body;

	const { error } = loginSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
		const user = await User.findOne({ email: input.email }).select("+password");

		if (!user) {
			throw Boom.notFound("E-posta adresi bulunamadı.");
		}

		const isMatched = await user.isValidPass(input.password);
		if (!isMatched) {
			throw Boom.unauthorized("E-posta veya şifre hatalı.");
		}

		const accessToken = await signAccessToken({
			user_id: user._id,
			role: user.role,
		});
		const refreshToken = await signRefreshToken(user._id);

		const userData = user.toObject();
		delete userData.password;
		delete userData.__v;

		res.json({ user: userData, accessToken, refreshToken });
	} catch (e) {
		return next(e);
	}
};

const RefreshToken = async (req, res, next) => {
	const { refresh_token } = req.body;

	try {
		if (!refresh_token) {
			throw Boom.badRequest();
		}

		const user_id = await verifyRefreshToken(refresh_token);

		const user = await User.findById(user_id);
		if (!user) {
			throw Boom.unauthorized();
		}

		const accessToken = await signAccessToken({
			user_id: user._id,
			role: user.role,
		});
		const refreshToken = await signRefreshToken(user._id);

		res.json({ accessToken, refreshToken });
	} catch (e) {
		next(e);
	}
};

const Logout = async (req, res, next) => {
	try {
		const { refresh_token } = req.body;
		if (!refresh_token) {
			throw Boom.badRequest();
		}

		const user_id = await verifyRefreshToken(refresh_token);
		const data = await redis.del(user_id);

		if (!data) {
			throw Boom.badRequest();
		}

		res.json({ message: "success" });
	} catch (e) {
		console.log(e);
		return next(e);
	}
};

const Me = async (req, res, next) => {
	const { user_id } = req.payload;

	try {
		const user = await User.findById(user_id);

		if (!user) {
			throw Boom.notFound("Kullanıcı bulunamadı.");
		}

		res.json(user);
	} catch (e) {
		next(e);
	}
};

const GetUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (e) {
		next(e);
	}
};

const Update = async (req, res, next) => {
	const { user_id } = req.params;
	const { password, role, ...input } = req.body;

	try {
		const user = await User.findByIdAndUpdate(user_id, input, { new: true });

		if (!user) {
			throw Boom.notFound("Kullanıcı bulunamadı.");
		}

		res.json(user);
	} catch (e) {
		next(e);
	}
};

const UpdatePassword = async (req, res, next) => {
	const { user_id } = req.params;
	const { oldPassword, newPassword } = req.body;

	try {
		if (!oldPassword || !newPassword) {
			throw Boom.badRequest("Eski ve yeni şifre gereklidir.");
		}

		if (newPassword.length < 8) {
			throw Boom.badRequest("Yeni şifre en az 8 karakter olmalıdır.");
		}

		const user = await User.findById(user_id).select("+password");

		if (!user) {
			throw Boom.notFound("Kullanıcı bulunamadı.");
		}

		const isMatched = await user.isValidPass(oldPassword);
		if (!isMatched) {
			throw Boom.unauthorized("Mevcut şifre hatalı.");
		}

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(newPassword, salt);

		user.password = hashed;
		await User.updateOne({ _id: user_id }, { password: hashed });

		res.json({ message: "Şifre başarıyla güncellendi." });
	} catch (e) {
		next(e);
	}
};

const Delete = async (req, res, next) => {
	const { user_id } = req.params;

	try {
		const deleted = await User.findByIdAndDelete(user_id);

		if (!deleted) {
			throw Boom.badRequest("Kullanıcı bulunamadı.");
		}

		res.json(deleted);
	} catch (e) {
		next(e);
	}
};

export default {
	Register,
	Login,
	RefreshToken,
	Logout,
	Me,
	GetUsers,
	Update,
	UpdatePassword,
	Delete,
};
