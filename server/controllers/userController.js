const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const jwtMaker = (id) => {
	const exp = Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 5);
	const token = jwt.sign({ id, exp }, process.env.JWT_SECRET_KEY, {
		algorithm: "HS256",
	});

	return token;
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
