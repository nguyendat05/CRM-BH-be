import { DataTypes } from "sequelize";

export const createTemplateClientModel = async (sequelize) => {
    const TemplateClient = sequelize.define(
        "template_client",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_template : {
                type: DataTypes.INTEGER,
                references: {
                    model: 'template',
                    key: 'id',
                },
            } ,
            id_client : {
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
            run_template : {
                type : DataTypes.STRING
            }

        },
        {
            schema: "public",
            tableName : "template_client",
            timestamps: false,
        }
    );
    return TemplateClient;
};