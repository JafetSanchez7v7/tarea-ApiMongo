const { connectToDatabase } = require("../config/database");
const { ObjectId } = require("mongodb");

const Categorias = [
  { nombre: "Esclavos" },
  { nombre: "JAJS" },
  { nombre: "Escljajajaavos" },
];

const getCategorias = async (req, res) => {
  try {
    const db = connectToDatabase();
    const productos = db.collection("categorias").find();
    if (!productos || productos.length === 0) {
      return res.status(200).json({ message: "No Hay registros" });
    }
    return res.status(200).json({ message: "Exito", items: productos });
  } catch (error) {
    console.log("Error al fetchear categorias", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoriasById = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Formato de id Invalido" });
    }

    const categoria = await db
      .collection("categorias")
      .findOne({ _id: new ObjectId(id) });

    if (!categoria)
      return res.status(404).json({ error: " recurso no encontrado" });

    return res.status(200).json({ message: "Exito", data: categoria });
  } catch (error) {
    console.log("Error al fetchear categorias por id", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCategorias = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const nuevaCategoria = req.body;
    if (!nuevaCategoria)
      return res.status(400).json({ error: "Entrada Invalida" });
    const categoria = await db
      .collection("categorias")
      .insertOne(nuevaCategoria);
    if (!categoria.acknowledged)
      return res.status(500).json({
        error: "Ocurrio un error al crear la categoria intentalo mas tarde",
      });

    return res
      .status(201)
      .json({ message: "exito", insertedId: categoria.insertedId });
  } catch (error) {
    console.log("ocurrio un error al crear la categoria:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCategoriasBulk = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const nuevaCategoria = req.body;
    if (!nuevaCategoria || nuevaCategoria.length === 0)
      return res.status(400).json({ error: "Entrada Invalida" });
    const categoria = await db
      .collection("categorias")
      .insertMany(nuevaCategoria);
    if (!categoria.acknowledged)
      return res.status(500).json({
        error: "Ocurrio un error al crear la categoria intentalo mas tarde",
      });

    return res
      .status(201)
      .json({ message: "exito", insertedIds: categoria.insertedIds });
  } catch (error) {
    console.log("ocurrio un error al crear la categoria:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const newBulk = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const categoria = await db.collection("categorias").insertMany(Categorias);
    if (!categoria.acknowledged)
      return res.status(500).json({
        error: "Ocurrio un error al crear la categoria intentalo mas tarde",
      });

    return res
      .status(201)
      .json({ message: "exito", insertedIds: categoria.insertedIds });
  } catch (error) {
    console.log("ocurrio un error al crear la categoria:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;

    //SINTAXIS PARA ACTUALIZAR UN PRODUCTO POR SU ID(MONGO)
    const result = await db
      .collection("categorias")
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category updated" });
  } catch (error) {
    console.error("Error updating Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;

    //SINTAXIS PARA ELIMINAR UN PRODUCTO POR SU ID(MONGO)
    const result = await db
      .collection("categorias")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category deleted" });
  } catch (error) {
    console.error("Error deleting Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCategorias,
  getCategoriasById,
  createCategorias,
  createCategoriasBulk,
  newBulk,
  updateCategory,
  deleteCategory,
};
