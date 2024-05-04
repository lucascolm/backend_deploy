require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
//sdfkhsdkjf
const path = require("path");
// const { DATABASE_URL } = process.env;

const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
const config = require(__dirname + "/config/config.js")[env];

// const sequelize = new Sequelize(
//   DATABASE_URL,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize=new
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }
// console.log("DIALECTO:",config.dialect)
// const sequelize=new Sequelize(config.database, config.username, config.password,{
//   host: config.host,
//   dialect: 'postgres'
// })
const sequelize = new Sequelize(config.url)
// const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Invitados, Evento } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Invitados.belongsToMany(Evento, { through: "evento_invitados" });
Evento.belongsToMany(Invitados, { through: "evento_invitados" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
