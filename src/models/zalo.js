import { DataTypes } from "sequelize";

export const createZaloModel = async (sequelize, schema) => {
    const Zalo = sequelize.define(
        "zalo",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            type: {
                type: DataTypes.STRING,
            },
            token: {
                type: DataTypes.STRING,
            },
        },
        {
            schema: "public",
            timestamps: false,
        }
    );
    return Zalo;
};