const { connectToDatabase } = require("../config/database");
const { ObjectId } = require("mongodb");

const getCajeros = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const cajero = await db.collection("cajeros").find().toArray();
    if (cajero.length == 0 || !cajero) {
      return res.status(200).json({ error: "no hay registros" });
    }

    res.status(200).json({
      message: "exito",
      data: cajero,
    });
  } catch (error) {
    console.log("ocurrio un error al fecthar los cajeros", error);
    return res.status(500).json({ error: "Ibternla server error" });
  }
};

const getCajeroById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToDatabase();
    const cajero = await db
      .collection("cajeros")
      .findOne({ _id: new ObjectId(id) });
    if (!cajero) {
      return res.status(404).json({ error: "no se encontro el cajero" });
    }

    res.status(200).json({
      message: "exito",
      data: cajero,
    });
  } catch (error) {
    console.log("ocurrio un error al fecthar los cajeros", error);
    return res.status(500).json({ error: "Ibternla server error" });
  }
};

const createCajero = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const body = req.body;
    if (!nuevo) return res.status(400).json({ error: "Formato invalido" });

    const nuevo = {
      nombre: body.nombre,
      turno: body.turno,
      salario: body.salario,
      estado: body.estado,
    };
    const cajero = await db.collection("cajeros").insertOne(nuevo);
    if (!cajero || cajero.acknowledged) {
      return res
        .status(500)
        .json({ error: "Ocurrio un error al crear el registro" });
    }
    return res
      .status(201)
      .json({ mensaje: "exito", insertedId: cajero.insertedId });
  } catch (error) {
    console.log("ocurrio un error al fecthar los cajeros", error);
    return res.status(500).json({ error: "Ibternla server error" });
  }
};

const updateCajero = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;

    //SINTAXIS PARA ACTUALIZAR UN PRODUCTO POR SU ID(MONGO)
    const result = await db
      .collection("cajeros")
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "cajero not found" });

    res.json({ message: "cajero updated" });
  } catch (error) {
    console.error("Error updating cajero:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCajero = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;

    //SINTAXIS PARA ELIMINAR UN PRODUCTO POR SU ID(MONGO)
    const result = await db
      .collection("cajeros")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "cajero not found" });

    res.json({ message: "cajero deleted" });
  } catch (error) {
    console.error("Error deleting cajero:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCajeroById,
  getCajeros,
  createCajero,
  updateCajero,
  deleteCajero,
};
