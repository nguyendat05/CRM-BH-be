import { DataTypes } from "sequelize";

export const createStoreModel = async (sequelize) => {
    const Store = sequelize.define(
        "store",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            storeId: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
            employee: {
                type: DataTypes.STRING,
            },
            date: {
                type: DataTypes.DATEONLY,
            },
            location: {
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
    return Store;
};