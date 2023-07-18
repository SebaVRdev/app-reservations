/* Configuracion de la aplicacion en express */
import express from "express";
import routes from "./routes/index.js"

const app = express();

// MDLW
app.use(express.json());

// RUTAS
app.use("/api", routes);

export default app;