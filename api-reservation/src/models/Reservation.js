// Ejemplo de definición de modelo en archivo separado (ej. models/Reservation.js)
import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

const Reservation = sequelize.define('Reservation', {
      // Definir las columnas de la tabla
      idReservation : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // ...
      price : {
        type : DataTypes.FLOAT
      },
      startTime : {
        type : DataTypes.DATE,
        defaultValue : new Date() 
      },
      finishTime : {
        type : DataTypes.DATE,
        defaultValue : new Date()
      }
    },
    {
      // Opciones adicionales del modelo
      timestamps : false 
    }
);

export default Reservation