import { DataTypes } from "sequelize";

export const createProductModel = async (sequelize) => {
    const Product = sequelize.define(
        "product",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
            code: {
                type: DataTypes.STRING,
            },
            note: {
                type: DataTypes.STRING,
            },
        },
        {
            schema: "public",
            tableName: "product",
            timestamps: false,
        }
    );
    return Product;
};
