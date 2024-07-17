import { DataTypes } from "sequelize";

export const createGroupClientModel = async (sequelize) => {
    const GroupClient = sequelize.define(
        "group_client",
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
            tableName : "group_client",
            timestamps: false,
        }
    );
    return GroupClient;
};