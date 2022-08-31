import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		lowercase: true,
	},
	surname: {
		type: String,
		required: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		toJSON: false,
	},
	birthday: {
		type: Date,
		required: true,
		trim: true,
	},
	gender: {
        type: String,
        enum: ["kadın", "erkek"]
    },
	phone: {
		type: String,
		required: true,
		match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
	},
	province: {
		type: String,
		required: true,
		lowercase: true,
	},
	district: {
		type: String,
		required: true,
		lowercase: true,
	},
	street: {
		type: String,
		required: true,
		lowercase: true,
	},
	terms: {
		type: Boolean,
		required: true,
	},
	role: {
		type: String,
		default: "user",
		enum: ["user", "admin"],
	},
});

UserSchema.pre("save", async function (next) {
	try {
		if (this.isNew) {
			const salt = await bcrypt.genSalt(10);
			const hashed = await bcrypt.hash(this.password, salt);
			this.password = hashed;
		}

		next();
	} catch (e) {
		next(error);
	}
});

UserSchema.methods.isValidPass = async function (pass) {
	return await bcrypt.compare(pass, this.password);
};

const User = mongoose.model("user", UserSchema);

export default User;
