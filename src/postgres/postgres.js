import { config } from "dotenv";
config();
import { Sequelize } from "sequelize";

// Model
import { createUserModel } from "../models/user.js";
import { createRoleModel } from "../models/role.js";
import { createOrderModel } from "../models/order.js";
import { createTransactionModel } from "../models/transactionMessage.js";
import { createPromotionModel } from "../models/promotionMessage.js";
import { createClientModel } from "../models/client.js";
import { createZaloModel } from "../models/zalo.js";
import { createStoreModel } from "../models/store.js";

const sequelize = new Sequelize(
	process.env.DATABASE,
	process.env.USER,
	process.env.PASSWORD,
	{
		host: process.env.HOST,
		dialect: "postgres",
		port: 5432,
		logging: false,
		pool: {
			max: 100,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		define: {
			timestamps: false,
		},
		dialectOptions: {
			connectTimeout: 60000,
		},
	}
);

let User = null;
let Role = null;
let Order = null;
let Transaction = null;
let Promotion = null;
let Client = null;
let Zalo = null;
let Store = null;

let currentSchema = process.env.INITIAL_SCHEMA;

const initializeModels = async (schema) => {
	User = await createUserModel(sequelize);
	Role = await createRoleModel(sequelize);
	Order = await createOrderModel(sequelize);
	Transaction = await createTransactionModel(sequelize);
	Promotion = await createPromotionModel(sequelize);
	Client = await createClientModel(sequelize);
	Zalo = await createZaloModel(sequelize);
	Store = await createStoreModel(sequelize);

	await sequelize.sync();
};

const connection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection DB successfully");

		await initializeModels(currentSchema);

		console.log("Database Synced");
	} catch (error) {
		console.error("Unable to connect to the database", error);
	}
};

const changeSchema = async (newSchema) => {
	currentSchema = newSchema;
	await initializeModels(currentSchema);
};

export {
	sequelize,
	connection,
	changeSchema,
	User,
	Role,
	Order,
	Transaction,
	Promotion,
	Client,
	Zalo,
	Store
};
