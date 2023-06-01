const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

const jwtMaker = (id) => {
	const exp = Math.floor(Date.now() / 1000 + 60 * 60 * 24);
	const jwtToken = jwt.sign({ id, exp }, process.env.JWT_SECRET_KEY, {
		algorithm: "HS256",
	});
	return jwtToken;
};

const jwtDecode = (token) => {
	const tokenDecoded = jwt.decode(token);
	return tokenDecoded;
};

exports.login = async (req, res, next) => {
	try {
		const reqUser = req.body;
		const user = await Admin.findOne({ pseudo: reqUser.pseudo });
		if (user == null) return next("Erreur");
		if (!user.motDePasse == reqUser.motDePasse)
			return next("Mauvais mot de passe");
		const token = jwtMaker(user._id);
		res.status(201).json({
			status: "succes",
			token,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error,
		});
	}
};

exports.create = async (req, res, next) => {
	try {
		const headers = req.headers;
		console.log("ah");
		const reqCreate = req.body;
		console.log("ah");
		const authorization = headers["authorization"].split(" ");
		if (
			!(authorization[0] == "Baerer") ||
			authorization[1] == undefined
		)
			return next("Connexion expiré");
		console.log("ah");
		const token = jwtDecode(authorization[1]);
		console.log("ah");
		if (token.exp < Date.now() / 1000)
			return next("Connexion expirée");
		console.log(token);
		const admin = await Admin.findById(token.id);
		console.log("ah");
		if (admin == null) return next("Identifient invalide");
		console.log("ah");
		const createAdmin = await Admin.create(reqCreate);
		console.log("ah");
		res.status(201).json({
			status: "succes",
			admin: createAdmin,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error,
		});
	}
};
