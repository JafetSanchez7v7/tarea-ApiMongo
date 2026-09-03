const express = require("express");
require("dotenv").config();
const productosRoutes = require("./src/routes/productos.routes");
const categoriasRoutes = require("./src/routes/categorias.routes");
const cajeroRoutes = require("./src/routes/cajeros.routes");
const ventaRoute = require("./src/routes/venta.routes");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", productosRoutes);
app.use("/api", categoriasRoutes);
app.use("/api", cajeroRoutes);
app.use("/api", ventaRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
