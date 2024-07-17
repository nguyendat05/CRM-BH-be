import { DataTypes } from "sequelize";

export const createVoucherCategoryModel = async (sequelize) => {
    const Category = sequelize.define(
        "voucher_category",
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
            schema: "public",
            tableName : "voucher_category",
            timestamps: false,
        }
    );
    return Category;
};