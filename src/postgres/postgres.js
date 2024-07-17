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
import {createGroupClientModel} from "../models/groupClient.js";
import {createEmployeeModel} from "../models/employee.js";
import {createProductModel} from "../models/product.js";
import {createVoucherModel} from "../models/voucher.js";
import {createVoucherCategoryModel} from "../models/voucherCategory.js";
import {createTemplateModel} from "../models/template.js";
import {createOrderScriptModel} from "../models/orderScript.js";
import {createPromotionScriptModel} from "../models/promotionScript.js";
import {createRolesModel} from "../models/roles.js";
import {createTemplateOrderModel} from "../models/templateOrder.js";
import {createTemplateClientModel} from "../models/templateClient.js";

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
let Zalo = null;
let Store = null;
let Client = null;
let GroupClient = null;
let Employee = null;
let Product = null;
let Voucher = null;
let VoucherCategory = null;
let Template = null;
let OrderScript = null;

let PromotionScript  = null;
let Roles  = null;
let TemplateOrder  = null;
let TemplateClient  = null;
const connection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection DB successfully");
		User = await createUserModel(sequelize);
		Role = await createRoleModel(sequelize);
		Transaction = await createTransactionModel(sequelize);
		Promotion = await createPromotionModel(sequelize);
		Zalo = await createZaloModel(sequelize);
		Store = await createStoreModel(sequelize);

		Roles  = await createRolesModel(sequelize);
		Employee = await createEmployeeModel(sequelize);
		GroupClient = await createGroupClientModel(sequelize);
		TemplateOrder = await createTemplateOrderModel(sequelize);
		Client = await createClientModel(sequelize);TemplateClient = await createTemplateClientModel(sequelize);Product = await createProductModel(sequelize);
		VoucherCategory = await createVoucherCategoryModel(sequelize);
		Voucher = await createVoucherModel(sequelize);
		Order = await createOrderModel(sequelize);
		Template = await createTemplateModel(sequelize);
		OrderScript = await createOrderScriptModel(sequelize);
		PromotionScript = await createPromotionScriptModel(sequelize);

		// Quan hệ giữa Order với Employee
		Employee.hasMany(Order, {foreignKey: 'id_employee', as: 'orders',});
		Order.belongsTo(Employee, {foreignKey: 'id_employee', as: 'employee',});

		// Quan hệ giữa Order với Client
		Client.hasMany(Order, {foreignKey: 'id_client', as: 'orders',});
		Order.belongsTo(Client, {foreignKey: 'id_client', as: 'client',});

		// Quan hệ giữa Order với Voucher
		Voucher.hasMany(Order, {foreignKey: 'id_voucher', as: 'orders',});
		Order.belongsTo(Voucher, {foreignKey: 'id_voucher', as: 'voucher',});

		// Quan hệ giữa Order với Product
		Product.hasMany(Order, {foreignKey: 'id_product', as: 'orders',});
		Order.belongsTo(Product, {foreignKey: 'id_product', as: 'product',});

		// Quan hệ giữa Client với Employee
		Employee.hasMany(Client, {foreignKey: 'id_employee', as: 'clients',});
		Client.belongsTo(Employee, {foreignKey: 'id_employee', as: 'employee',});

		// Quan hệ giữa Client với GroupClient
		GroupClient.hasMany(Client, {foreignKey: 'id_group', as: 'clients',});
		Client.belongsTo(GroupClient, {foreignKey: 'id_group', as: 'groupClient',});


		// Quan hệ giữa Voucher với Employee
		Employee.hasMany(Voucher, {foreignKey: 'id_employee', as: 'vouchers',});
		Voucher.belongsTo(Employee, {foreignKey: 'id_employee', as: 'employee',});

		// Quan hệ giữa Voucher với VoucherCategory
		VoucherCategory.hasMany(Voucher, {foreignKey: 'id_category', as: 'vouchers',});
		Voucher.belongsTo(VoucherCategory, {foreignKey: 'id_category', as: 'voucherCategory',});

		// Quan hệ giữa Voucher với Client
		Client.hasMany(Voucher, {foreignKey: 'id_client', as: 'vouchers',});
		Voucher.belongsTo(Client, {foreignKey: 'id_client', as: 'client',});


		// Quan hệ giữa Employee với Roles
		Roles.hasMany(Employee, {foreignKey: 'id_roles', as: 'employees',});
		Employee.belongsTo(Roles, {foreignKey: 'id_roles', as: 'role',});

		// Quan hệ giữa Employee với Employee
		Employee.hasMany(Employee, {foreignKey: 'id_employee', as: 'employees',});
		Employee.belongsTo(Employee, {foreignKey: 'id_employee', as: 'employee',});



		// Quan hệ giữa  OrderScript với TemplateOrder
		TemplateOrder.hasMany(OrderScript, {foreignKey: 'orderTemplateId', as: 'orderScripts',});
		OrderScript.belongsTo(TemplateOrder, {foreignKey: 'orderTemplateId', as: 'templateOrder',});


		// Quan hệ giữa PromotionScript với Template
		Template.hasMany(PromotionScript, {foreignKey: 'id_template', as: 'promotionScripts',});
		PromotionScript.belongsTo(Template, {foreignKey: 'id_template', as: 'template',});


		// Quan hệ giữa Order với Template
		Order.hasMany(TemplateOrder, {foreignKey: 'id_order', as: 'templateOrders',});
		TemplateOrder.belongsTo(Order, {foreignKey: 'id_order', as: 'order',});

		Template.hasMany(TemplateOrder, {foreignKey: 'id_template', as: 'templateOrders',});
		TemplateOrder.belongsTo(Template, {foreignKey: 'id_template', as: 'template',});

		// Quan hệ giữa Client với Template
		Client.hasMany(TemplateClient, {foreignKey: 'id_client', as: 'templateClients',});
		TemplateClient.belongsTo(Client, {foreignKey: 'id_client', as: 'client',});

		Template.hasMany(TemplateClient, {foreignKey: 'id_template', as: 'templateClients',});
		TemplateClient.belongsTo(Template, {foreignKey: 'id_template', as: 'template',});




		await sequelize.sync();
		console.log("Database Synced");


	} catch (error) {
		console.error("Unable to connect to the database", error);
	}
};


export {
	sequelize,
	connection,
	User,
	Role,

	Order,
	Transaction,
	Promotion,
	Zalo,
	Store,
	Client,
	GroupClient,
	Employee,
	Product,
	Voucher,
	VoucherCategory,
	Template,
	OrderScript,
	PromotionScript,
	Roles,
	TemplateOrder,
	TemplateClient,
};
