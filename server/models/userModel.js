const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const checker = require("../utils/CheckerHandler");

const infoCredit = new mongoose.Schema({
	numero: {
		type: Number,
		required: [true, "Vous devez specifier votre numero de carte"],
	},
	expiration: {
		type: Number,
		required: [
			true,
			"Vous devez specifier votre date d'expiration",
		],
	},
	ccv: {
		type: Number,
		required: [true, "Vous devez specifier votre ccv"],
	},
	titulaire: {
		type: String,
		required: [
			true,
			"Vous devez specifier le titulaire de la carte bancaire",
		],
	},
});

const userSchema = new mongoose.Schema({
	prenom: {
		type: String,
		required: [true, "Vous devez specifier votre prenom"],
	},

	nom: {
		type: String,
		required: [true, "Vous devez specifier votre nom"],
	},
	motDePasse: {
		type: String,
		required: [true, "Vous devez specifier un mot de passe"],
	},
	mail: {
		type: String,
		unique: [true, "Cette email est deja utiliser"],
		required: [true, "Vous devez specifier votre adresse email"],
		validate: [
			{
				validator: function (value) {
					const MailChecker = new checker(value);
					return MailChecker.mailChecker();
				},
				message: "Vous devez specifier une adresse email valide",
			},
		],
	},
	adresse: {
		type: String,
		required: [true, "Vous devez specifier votre adresse"],
	},
	telephone: {
		type: Number,
		required: [
			true,
			"Vous devez specifier votre numero de telephone",
		],
	},
	nomUtilisateur: {
		type: String,
		required: [true, "Vous devez specifier un nom dutilisateur"],
	},
	carteCredit: infoCredit,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("motDePasse")) return next();
	this.motDePasse = await bcrypt.hash(this.motDePasse, 12);
});

userSchema.methods.comparePassword = async function (
	tryConPass,
	realConnection
) {
	return await bcrypt.compare(tryConPass, realConnection);
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
