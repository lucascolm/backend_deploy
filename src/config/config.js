require("dotenv").config();
const port = process.env.PGPORT || 3001;

module.exports = {
  server: {
    port: port,
  },
  development: {
    url:'postgresql://postgres:YLPLTIWXcsDPRtOLwFHRjswiGmfXSnNp@viaduct.proxy.rlwy.net:45310/railway',
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: 'acreditaciones',
    host: process.env.PGHOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: "1234",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    // username: "root",
    // password: null,
    // database: "database_production",
    // host: "127.0.0.1",
    // dialect: "mysql",
  },
};
