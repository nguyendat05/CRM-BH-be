import { DataTypes } from 'sequelize';

export const createClientModel = async (sequelize) => {
    const Client = sequelize.define(
        'client',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
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
            name: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            dob: {
                type: DataTypes.DATE,
            },
            email: {
                type: DataTypes.STRING,
            },
            zalo_id: {
                type: DataTypes.STRING,
            },
            total_val: {
                type: DataTypes.INTEGER,
            },
            amount_deal: {
                type: DataTypes.INTEGER,
            },
            total_point: {
                type: DataTypes.INTEGER,
            },
            deal_point: {
                type: DataTypes.INTEGER,
            },
            difference_point: {
                type: DataTypes.INTEGER,
            },
            used_point: {
                type: DataTypes.INTEGER,
            },
            id_group: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: {
                        schema: 'public',
                        tableName: 'group_client',
                    }
                },
                key: 'id'
            },
            latest_transaction_date: {
                type: DataTypes.DATE,
            },
            latest_care_date: {
                type: DataTypes.DATE,
            },
            latest_care_channel: {
                type: DataTypes.STRING,
            },
            care_recommend: {
                type: DataTypes.BOOLEAN,
            },
            address: {
                type: DataTypes.STRING,
            },
            total_value: {
                type: DataTypes.INTEGER,
            },
            note: {
                type: DataTypes.STRING,
            },
            create_at: {
                type: DataTypes.DATE,
            },
        },
        {
            schema: 'public',
            tableName: 'client',
            timestamps: false,
        }
    );

    return Client;
};
