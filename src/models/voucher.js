import { DataTypes } from "sequelize";

export const createVoucherModel = async (sequelize) => {
    const Voucher = sequelize.define(
        "voucher",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                type: DataTypes.STRING,
            },
            value: {
                type: DataTypes.INTEGER,
            },
            validity_period: {
                type: DataTypes.DATE,
            },
            expiration_period: {
                type: DataTypes.DATE,
            },
            source: {
                type: DataTypes.STRING,
            },
            id_employee: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        schema: 'public',
                        tableName: 'employee',
                    }
                },
                key: 'id'
            },
            quantity: {
                type: DataTypes.INTEGER,
            },
            used: {
                type: DataTypes.INTEGER,
            },
            note: {
                type: DataTypes.STRING,
            },
            code: {
                type: DataTypes.STRING,
            },
            id_category: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        schema: 'public',
                        tableName: 'voucher_category',
                    }
                },
                key: 'id'
            },
        },
        {
            schema: "public",
            tableName: "voucher",
            timestamps: false,
        }
    );
    return Voucher;
};
