const { Router } = require("express");
const {
  getCajeroById,
  getCajeros,
  createCajero,
  updateCajero,
  deleteCajero,
} = require("../controllers/cajero.controller");

const router = new Router();

router.get("/cajeros", getCajeros);
router.get("/cajeros/:id", getCajeroById);
router.post("/cajeros", createCajero);
router.put("/cajeros/:id", updateCajero);
router.delete("/cajeros/:id", deleteCajero);

module.exports = router;
