import { DataTypes } from 'sequelize';

export const createPromotionScriptModel = async (sequelize) => {
    const PromotionScript = sequelize.define(
        'promotion_script',
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
            id_template: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        schema: 'public',
                        tableName: 'template',
                    }
                },
                key: 'id'
            },
            voucher: {
                type: DataTypes.STRING,
            },
            voucherNote: {
                type: DataTypes.STRING,
            },
            first: {
                type: DataTypes.DATE,
            },
            second: {
                type: DataTypes.DATE,
            },
            third: {
                type: DataTypes.DATE,
            },
            fourth: {
                type: DataTypes.DATE,
            },
            fifth: {
                type: DataTypes.DATE,
            },
            repeat: {
                type: DataTypes.BOOLEAN,
            },
            zaloApply: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            schema: 'public',
            tableName: 'promotion_script',
            timestamps: false,
        }
    );

    return PromotionScript;
};
