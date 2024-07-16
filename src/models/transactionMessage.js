import { DataTypes } from "sequelize";

export const createTransactionModel = async (sequelize) => {
    const Transaction = sequelize.define(
        "transaction",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            banner: {
                type: DataTypes.STRING,
            },
            header: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.STRING,
            },
            send: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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
    return Transaction;
};