import {DataTypes} from 'sequelize';

export const createOrderModel = async (sequelize) => {
    const Order = sequelize.define(
        'order',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                type: DataTypes.STRING,
            },
            date: {
                type: DataTypes.DATE,
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
            id_client: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        schema: 'public',
                        tableName: 'client',
                    }
                },
                key: 'id'
            },
            id_product: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        schema: 'public',
                        tableName: 'product',
                    }
                },
                key: 'id'
            },

            id_voucher: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        schema: 'public',
                        tableName: 'voucher',
                    }
                },
                key: 'id'
            },
            code: {
                type: DataTypes.STRING,
            },
            zaloID: {
                type: DataTypes.STRING,
            },
            thoi_han : {
                type: DataTypes.DATE,
            },
            ngay_thanh_toan_phi : {
                type: DataTypes.DATE,
            },
            tien_gom_VAT : {
                type: DataTypes.DECIMAL,
            },
            point: {
                type: DataTypes.INTEGER,
            },
            note: {
                type: DataTypes.STRING,
            },
        },
        {
            schema: 'public',
            tableName: 'order',
            timestamps: false,
        }
    );

    return Order;
};
