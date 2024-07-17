import { DataTypes } from 'sequelize';

export const createOrderScriptModel = async (sequelize) => {
    const OrderScript = sequelize.define(
        'order_script',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            describe: {
                type: DataTypes.STRING,
            },
            orderTemplateId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        schema: 'public',
                        tableName: 'template_order',
                    }
                },
                key: 'id'
            },
            emailTemplateId: {
                type: DataTypes.STRING,
            },
            rateTemplateId: {
                type: DataTypes.STRING,
            },

            zaloApply: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            schema: 'public',
            tableName: 'order_script',
            timestamps: false,
        }
    );

    return OrderScript;
};
