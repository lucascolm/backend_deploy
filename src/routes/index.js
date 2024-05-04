const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const invitados = require("./invitados.js");
const eventos = require("./eventos.js");
const login = require("./login.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/",(req,res)=>{
  res.send("hola")
})
router.get("/pin",(req,res)=>{
  res.send("maldito cors")
})
router.use("/invitados", invitados);
router.use("/eventos", eventos);
router.use("/login", login);

module.exports = router;
