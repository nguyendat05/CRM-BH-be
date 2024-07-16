import { DataTypes } from "sequelize";

export const createRoleModel = async (sequelize) => {
  const Role = await sequelize.define(
    "roles",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      schema: "userinfo",
      timestamps: false,
    }
  );
  return Role;
};
