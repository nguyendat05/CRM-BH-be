import {DataTypes} from 'sequelize';

export const createTemplateModel = async (sequelize) => {
    const Template = sequelize.define(
        'template',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            templateId: {
                type: DataTypes.STRING,
            },
            type: {
                type: DataTypes.STRING,
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
            emailId: {
                type: DataTypes.STRING,
            },
        },
        {
            schema: 'public',
            tableName: 'template',
            timestamps: false,
        }
    );

    return Template;
};
