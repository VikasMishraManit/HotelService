import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "./sequelize";


class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare location: string;
  declare rating: number;
  declare ratingCount: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: Date;
}

Hotel.init(
  {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    address: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    location: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    rating: {
      type: "FLOAT",
      defaultValue: 0,
    },
    ratingCount: {
      type: "INTEGER",
      defaultValue: 0,
    },
    createdAt: {
      type: "DATE",
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: "DATE",
      allowNull: false,
      defaultValue: new Date(),
    },  

  },
  {
    tableName: "hotels",
    sequelize: sequelize

  });



export default Hotel;