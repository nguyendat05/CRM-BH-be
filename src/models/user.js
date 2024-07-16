import { DataTypes } from "sequelize";

export const createUserModel = async (sequelize) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.TEXT,
      }
    },
    {
      schema: "userinfo",
      timestamps: false,
    }
  );
  return User;
};
