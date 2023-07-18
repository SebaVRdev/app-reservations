// Inicio de la APIs
import app from "./app.js"
import sequelize from './db/database.js';

// Traemos los modelos
import * as models from "./models/index.js";

console.log("Iniciando API")

sequelize.sync({ force: true }).then(() => {
  app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });
});