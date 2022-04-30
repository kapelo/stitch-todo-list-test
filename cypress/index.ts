(async function () {
	const runner = await require("./module");
	// eslint-disable-next-line no-console
	console.log("Starting Tests");
	runner();
})();
