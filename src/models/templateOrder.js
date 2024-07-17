import { DataTypes } from "sequelize";

export const createTemplateOrderModel = async (sequelize) => {
    const TemplateOrder = sequelize.define(
        "template_order",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_template : {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        schema: 'public',
                        tableName: 'template',
                    }
                },
                key: 'id'
            } ,
            id_order : {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        schema: 'public',
                        tableName: 'order',
                    }
                },
                key: 'id'
            },
            run_template : {
                type : DataTypes.STRING
            }

        },
        {
            schema: "public",
            tableName : "template_order",
            timestamps: false,
        }
    );
    return TemplateOrder;
};