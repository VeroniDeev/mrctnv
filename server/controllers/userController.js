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

exports.logUser = async (req, res, next) => {
	try {
		const headers = req.headers;
		const idTryConnect = req.params.id;
		const authorization = headers["authorization"];
		const token = authorization.split(" ");
		if (!token.includes("Baerer") || token[1] === undefined)
			return next("Connexion expirée");
		const idToken = jwtChecker(token[1]);
		const user = await User.findById(idToken);
		if (user === null) return next("Utilisateur non existant");
		if (!idTryConnect == user._id)
			return next("Ce n'est pas votre compte");
		res.status(200).json({
			status: "succes",
			user,
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
		if (getUser === null) return next("Adresse email inconnu");
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
			user: getUser,
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			error,
		});
	}
};
