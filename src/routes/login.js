const { Router } = require("express");
const router = Router(); //express.Router('')
require("dotenv").config();
const { U_EMAIL, U_PASS } = process.env;
const config = require("../config/config.js").development;
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  console.log("env",config.user_pass,config.user_login);
  try {
    if (email !== config.user_login || password !== config.user_pass) {
      return res.status(403).send("Email o contraseña inválidos");
    } else {
      var token = jwt.sign({ email: email, password: password }, "magnetica");
      console.log("EL TOKEEEEN", token);
      return res.status(200).json({ token });
    }
  } catch (error) {
    res.status(403).send(error.message);
  }
});

module.exports = router;
