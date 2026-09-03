const { Router } = require("express");
const { realizarVenta } = require("../controllers/ventas.controller");
const router = Router();

router.post("/ventas", realizarVenta);
module.exports = router;
