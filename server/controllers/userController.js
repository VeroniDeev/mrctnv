const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const jwtMaker = (id) => {
	const exp = Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 5);
	const token = jwt.sign({ id, exp }, process.env.JWT_SECRET_KEY, {
		algorithm: "HS256",
	});

	return token;
};

const jwtChecker = (token) => {
	const decodeToken = jwt.decode(token);
	return decodeToken.id;
};

exports.getUser = (req, res, next) => {
	res.status(200).json({
		message: "Tours est bon",
		information: User,
	});
};

exports.createUser = async (req, res, next) => {
	try {
		const reqUser = req.body;
		const user = await User.create(reqUser);
		const token = jwtMaker(user._id);
		res.status(201).json({
			status: "succes",
			token,
			information: user,
		});
	} catch (err) {
		res.status(200).json({
			status: "failed",
			error: err,
		});
	}
};

exports.logUser = (req, res, next) => {
	try {
		const headers = req.headers;
		const authorization = headers["Authorization"];
		const token = authorization.split(" ")[1];
		if (!authorization.includes("Baerer") || token == undefined) {
			return next("Connexion expirée");
		}
		const idToken = jwtChecker(token);
		if (User.findById(idToken) == null) {
			return next("Utilisateur non existant");
		}
		res.status(200).json({
			status: "succes",
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			error,
		});
	}
};

exports.login = async (req, res, next) => {
	try {
		const logUser = req.body;
		const getUser = await User.findOne({ mail: logUser.mail });
		if (getUser == null) return next("Adresse email inconnu");
		const isGoodPass = await getUser.comparePassword(
			logUser.motDePasse,
			getUser.motDePasse
		);
		if (!isGoodPass)
			return next("Adresse email ou mot de passe incorrecte");
		const token = jwtMaker(getUser._id);
		res.status(200).json({
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
