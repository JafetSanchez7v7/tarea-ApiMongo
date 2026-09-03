const { Router } = require("express");
const {
  getCategorias,
  getCategoriasById,
  createCategorias,
  createCategoriasBulk,
  newBulk,
  updateCategory,
  deleteCategory,
} = require("../controllers/categorias.controller");

const router = new Router();

router.get("/categorias", getCategorias);
router.get("/categorias/:id", getCategoriasById);
router.post("/categorias", createCategorias);
router.post("/categorias/bulk", createCategoriasBulk);
router.put("/categorias/:id", updateCategory);
router.delete("/categorias/:id", deleteCategory);
router.get("/categoriaas", newBulk);

module.exports = router;
