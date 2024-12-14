// src/models/farmerModel.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbConfig";
import Product from "./productModels";

class Farmer extends Model {}

Farmer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Farmer",
  }
);

Farmer.hasMany(Product, { foreignKey: "farmerId" });
Product.belongsTo(Farmer, { foreignKey: "farmerId" });

export default Farmer;
