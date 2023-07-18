// Ejemplo de definición de modelo en archivo separado (ej. models/Reservation.js)
import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

const Reservation = sequelize.define(
    'Reservation',
    {
      // Definir las columnas de la tabla
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // ...
    },
    {
      // Opciones adicionales del modelo
      // ...
    }
);

export default Reservation