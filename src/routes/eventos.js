const { Router } = require("express");
const router = Router();
const { Invitados, Evento } = require("../db");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    let eventos = await Evento.findAll({ include: Invitados });
    res.status(200).json(eventos);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await Evento.findOne({
      where: {
        id: id,
      },
      include: {
        model: Invitados,
        attributes: [
          "first_name",
          "last_name",
          "id",
          "list_id",
          "list_name",
          "company",
          "status",
        ],
      },
    });

    if (evento) return res.status(200).json(evento);
  } catch (error) {
    return res.status(404).send("No se encontró un Evento con ese ID");
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("estoy en las rutasss");
    const { nombre, cliente, fechaInicio, fechaFin, direccion } = req.body;
    if (!nombre || !cliente) res.status(400).send("se requieren mas datos");

    let nuevoEvento = await Evento.create({
      nombre: nombre,
      cliente: cliente,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      direccion: direccion,
    });
    res.status(200).json(nuevoEvento);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, archived } = req.body;

  try {
    if (!archived) {
      let evento = await Evento.findByPk(id);
      await evento.update({ status: status });

      return res.status(200).json(evento);
    } else if (archived) {
      let evento = await Evento.findByPk(id);
      await evento.update({ archived: archived });

      return res.status(200).json(evento);
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Evento.destroy({ where: { id: id } });
    return res.status(200).send("Evento eliminado correctamente");
  } catch (error) {
    return res.status(404).send("No se encontró un Evento con ese ID");
  }
});

module.exports = router;
