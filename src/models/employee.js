import { DataTypes } from "sequelize";

export const createEmployeeModel = async (sequelize) => {
    const Employee = sequelize.define(
        "employee",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            status: {
                type: DataTypes.STRING,
            },

            email: {
                type: DataTypes.STRING,
            },

            phoneNumber: {
                type: DataTypes.STRING,
            },

            name: {
                type: DataTypes.STRING,
            },

            note : {
                type : DataTypes.STRING
            },

            id_roles : {
                type: DataTypes.INTEGER,
                references: {
                    model: 'roles',
                    key: 'id',
                },
            },

        },
        {
            schema: "public",
            tableName : "employee",
            timestamps: false,
        }
    );
    return Employee;
};