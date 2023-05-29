const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

const db = process.env.DB.replace("<password>", process.env.PASSWORD_DB);

mongoose.connect(db).then(() => {
	console.log("Connexion a la base de donnée effectuer avec succes");
});

app.listen(8080, () => {
	console.log("le serveur a ete lancer avec succes");
});
