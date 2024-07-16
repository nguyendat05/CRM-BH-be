import { Op, Sequelize } from "sequelize";
import moment from "moment";

export const getsAllData = (table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await table.findAll({
				order: [["id", "DESC"]],
				raw: true,
			});
			resolve({
				err: response ? 0 : 1,
				msg: response ? "OK" : "Data not found!",
				response,
			});
		} catch (error) {
			reject({
				err: 2,
				msg: "Failed to fetch datas: " + error,
			});
		}
	});

export const updateRowData = (id, updatedData, table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await table.update(updatedData, {
				where: { id: id },
			});
			resolve({
				err: response ? 0 : 1,
				msg: response
					? "Folder updated successfully"
					: "Failed to update Row",
				response,
			});
		} catch (error) {
			reject({
				err: 2,
				msg: "Failed to update Row: " + error,
			});
		}
	});