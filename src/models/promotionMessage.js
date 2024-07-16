import { DataTypes } from "sequelize";

export const createPromotionModel = async (sequelize) => {
    const Promotion = sequelize.define(
        "promotion",
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
            code: {
                type: DataTypes.STRING,
            },
            expiryDate: {
                type: DataTypes.DATEONLY,
            },
            applyNote: {
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
    return Promotion;
};