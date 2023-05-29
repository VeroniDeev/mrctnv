const mongoose = require("mongoose");
const Checker = require("../utils/RegexHandler");

const eventSchema = new mongoose.Schema({
	titre: {
		type: String,
		required: [true, "Vous devez specifier un titre d'evenement"],
	},
	artiste: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, "Vous devez specifier l'artiste"],
		ref: "Artiste",
	},
	lieu: {
		type: String,
		required: [true, "Vous devez specifier le lieu de l'evenement"],
	},
	date: {
		type: Date,
		required: [true, "Vous devez specifier la date de l'evenement"],
		validate: [
			{
				validator: function (value) {
					const checkDate = new Checker(value);
					return checkDate.dateChecker();
				},
				message: "Veuillez rentrez une date correcte",
			},
		],
	},
});

const Event = new mongoose.model("Event", eventSchema);

module.exports = Event;
