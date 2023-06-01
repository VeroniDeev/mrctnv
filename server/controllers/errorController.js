const errorHandler = (err, req, res, next) => {
	res.status(400).json({
		status: "failed",
		error: err,
	});
};

module.exports = errorHandler;
