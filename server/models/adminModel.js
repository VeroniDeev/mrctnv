const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Checker = require("../utils/CheckerHandler");

const adminSchema = new mongoose.Schema({
	pseudo: {
		type: String,
		required: [
			true,
			"Tu dois rentrer un nom d'utilisateur à utiliser",
		],
		unique: [true, "Ce nom d'utilisateur est déjà prit"],
	},
	mail: {
		type: String,
		required: [true, "Tu dois rentrer votre adresse email"],
		unique: [true, "Ce nom d'utilisateur est déjà prit"],
		validate: [
			{
				validator: function (value) {
					const emailCheck = new Checker(value);
					return emailCheck.mailChecker();
				},
				message: "Tu dois rentrer une adresse email valide",
			},
		],
	},
	motDePasse: {
		type: String,
		required: [true, "Tu dois rentrer un mot de passe"],
		unique: false,
	},
});

adminSchema.pre("save", async function (next) {
	if (!this.isModified(this.motDePasse)) return next();
	this.motDePasse = await bcrypt.hash(this.motDePasse, 12);
});

const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;
