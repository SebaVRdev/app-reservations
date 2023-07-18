import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';
import slugify from 'slugify';

const Court = sequelize.define(
    'Court',
    {
      // Definir las columnas de la tabla
      idCourt : {
        type         : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey   : true
      },
      slug : {
        type: DataTypes.STRING,
        unique: true 
      },
      description : {
        type: DataTypes.STRING,
        unique: true 
      },
      type : {
        type: DataTypes.STRING
      }
      // ...
    },
    {
      // Opciones adicionales del modelo
      // ...
      timestamps: false,
      hooks : {
        beforeCreate : (instance, options) => {
          instance.slug = slugify(instance.description)
        }
      }
    }
);

export default Court