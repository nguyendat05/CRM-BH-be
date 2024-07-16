import { DataTypes } from "sequelize";

export const createOrderModel = async (sequelize) => {
    const Order = sequelize.define(
        "order",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            phoneNumber: {
                type: DataTypes.STRING,
            },
            gender: {
                type: DataTypes.STRING,
            },
            date: {
                type: DataTypes.DATEONLY,
            },
            userApply: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            billPrice: {
                type: DataTypes.STRING,
            },
            pathologicalGroup: {
                type: DataTypes.STRING,
            },
            clientNote: {
                type: DataTypes.STRING,
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
    return Order;
};