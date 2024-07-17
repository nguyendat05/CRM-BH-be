import { DataTypes } from "sequelize";

export const createRolesModel = async (sequelize) => {
  const Roles = await sequelize.define(
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

      status: {
        type: DataTypes.STRING,
      },
    },
    {
        schema: 'public',
        tableName: 'roles',
        timestamps: false,
    }
  );
  return Roles;
};
