const { connectToDatabase } = require("../config/database");
const { ObjectId } = require("mongodb");

const getCategorias = async (req, res) => {
  const db = await connectToDatabase();
};
