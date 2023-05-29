const admin = require("../models/adminModel");

exports.create = async (req, res, next) => {
	const oui = await admin.create({
		pseudo: "oui",
		mail: "salut@gmail.com",
		motDePasse: "salut",
	});
};
