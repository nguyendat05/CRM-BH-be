import { DataTypes } from "sequelize";

export const createClientModel = async (sequelize) => {
    const Client = sequelize.define(
        "client",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
            phoneNumber: {
                type: DataTypes.STRING,
            },
            totalCost: {
                type: DataTypes.STRING,
            },
            point: {
                type: DataTypes.INTEGER,
            },
            firstDate: {
                type: DataTypes.DATEONLY,
            },
            show: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            }
        },
        {
            schema: "public",
            timestamps: false,
        }
    );
    return Client;
};