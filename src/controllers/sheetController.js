import {
	getsAllData,
	getValueData,
	createNewRow,
	updateRowData,
	hideRowData,
	getsReportData,
	getsUserData,
} from "../services/sheetService.js"
import {
	Order,
	Transaction,
	Promotion,
	Client,
	Store
} from "../postgres/postgres.js";
import * as dotenv from "dotenv";
dotenv.config();

const getController = (table) => {
	if (table == 'order') {
		return Order
	} else if (table == 'transaction') {
		return Transaction
	} else if (table == 'promotion') {
		return Promotion
	} else if (table == 'client') {
		return Client
	} else if (table == 'store') {
        return Store
    }
}

export const getsAllDataController = async (req, res) => {
	try {
		let { table } = req.params;

		table = getController(table);

		const response = await getsAllData(table);

		if (response.err === 1) {
			res.status(400).json({
				err: 1,
				msg: "Task not found!",
			});
		} else {
			res.status(200).json(response);
		}
	} catch (error) {
		console.log(error);
	}
}

export const getsUserDataController = async (req, res) => {
	try {
		let { phoneNumber, table } = req.params;

		table = getController(table);

		const response = await getsUserData(phoneNumber, table);

		if (response.err === 1) {
			res.status(400).json({
				err: 1,
				msg: "Task not found!",
			});
		} else {
			res.status(200).json(response);
		}
	} catch (error) {
		console.log(error);
	}
}

export const getValueController = async (req, res) => {
	try {
		let { column, table } = req.params;

		table = getController(table);

		const response = await getValueData(column, table);

		if (response.err === 1) {
			res.status(400).json({
				err: 1,
				msg: "Task not found!",
			});
		} else {
			res.status(200).json(response.values);
		}
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
		});
	}
}

export const createNewRowController = async (req, res) => {
	try {
		let { newRowData, table } = req.body;
		table = getController(table);
		const response = await createNewRow(newRowData, table);

		if (response.err === 0) {
			res.status(200).json(response);
		} else {
			res.status(400).json(response);
		}
	} catch (error) {
		console.error(error)
	}
};

export const updateNewRowController = async (req, res) => {
	try {
		let { id, table } = req.params;
		table = getController(table);
		const updatedData = req.body;
		const response = await updateRowData(id, updatedData, table);

		if (response.err === 0) {
			res.status(200).json(response);
		} else {
			res.status(400).json(response);
		}
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
		});
	}
};

export const hideRowController = async (req, res) => {
	try {
		let { id, table } = req.params;
		table = getController(table);

		const response = await hideRowData(id, table);

		if (response.err === 0) {
			res.status(200).json(response);
		} else {
			res.status(400).json(response);
		}
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
		});
	}
};

export const getsReportDataController = async (req, res) => {
	try {
		let { table, dateRange } = req.params;

		table = getController(table);

		const response = await getsReportData(table, dateRange);

		if (response.err === 1) {
			res.status(400).json({
				err: 1,
				msg: "Task not found!",
			});
		} else {
			res.status(200).json(response.response);
		}
	} catch (error) {
		console.log(error);
	}
}