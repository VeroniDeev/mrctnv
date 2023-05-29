class RegexHandler {
	constructor(value) {
		this.value = value;
	}
	mailChecker() {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		console.log(regex.test(this.value));
		return regex.test(this.value);
	}
	dateChecker() {
		const reelDate = Date.now();
		const userDate = new Date(this.value).getTime();
		if (reelDate < userDate) return false;
		return true;
	}
}

module.exports = RegexHandler;
