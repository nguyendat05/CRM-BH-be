import { Op, Sequelize } from "sequelize";
import moment from "moment";

export const getsAllData = (table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await table.findAll({
				order: [["id", "DESC"]],
				raw: true,
				where: {
					show: true,
				}
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

export const getsUserData = (phoneNumber, table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await table.findOrCreate({
				where: {
					phoneNumber: phoneNumber,
				},
				default: {
					phoneNumber: phoneNumber,
                    show: true,
				}
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

export const getValueData = (column, table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await table.findAll({
				attributes: [column],
				order: [[column, "ASC"]],
			});

			// Extract values from the response
			const values = response.map(item => item[column]);

			resolve({
				err: values.length > 0 ? 0 : 1,
				msg: values.length > 0 ? "OK" : "Values not found!",
				values,
			});
		} catch (error) {
			reject({
				err: 2,
				msg: "Failed to fetch values: " + error,
			});
		}
	});

export const createNewRow = (rowData, table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await table.create({
				...rowData,
				show: rowData.show ?? true
			});
			resolve({
				err: response ? 0 : 1,
				msg: response
					? "New Row created successfully"
					: "Failed to create new Row",
				response,
			});
		} catch (error) {
			reject({
				err: 2,
				msg: "Failed to create new Row: " + error,
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

export const hideRowData = (id, table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await table.update({ show: false }, {
				where: { id: id },
			});

			resolve({
				err: response ? 0 : 1,
				msg: response
					? "Row deleted successfully"
					: "Failed to delete row",
				response,
			});
		} catch (error) {
			await t.rollback();
			reject({
				err: 2,
				msg: "Failed to delete row: " + error,
			});
		}
	});


// REPORT API
export const getsReportData = (table, dateRange) =>
	new Promise(async (resolve, reject) => {
		try {
			let startDate, endDate;
			switch (dateRange) {
				case "day":
					startDate = moment().startOf('day').toDate();
					endDate = moment().endOf('day').toDate();
					break;
				case "week":
					startDate = moment().startOf('week').subtract(1, 'week').toDate();
					endDate = moment().endOf('week').toDate();
					break;
				case "month":
					startDate = moment().startOf('month').subtract(1, 'month').toDate();
					endDate = moment().endOf('month').toDate();
					break;
				default:
					reject({
						err: 3,
						msg: "Invalid date range specified."
					});
					return;
			}

			let response = await table.findAll({
				attributes: [
					[Sequelize.fn('SUM', Sequelize.literal('REPLACE("billPrice", \',\', \'\')::INTEGER')), 'sumPrice'],
					[Sequelize.fn('COUNT', Sequelize.col('id')), 'numOrder'],
					[Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('phoneNumber'))), 'numPhoneNumbers'],
					[Sequelize.fn('DATE', Sequelize.col('date')), 'orderDate']
				],
				raw: true,
				where: {
					show: true,
					date: {
						[Op.between]: [startDate, endDate]
					}
				},
				group: [Sequelize.fn('DATE', Sequelize.col('date'))],
				order: [[Sequelize.fn('DATE', Sequelize.col('date')), 'DESC']]
			});

			resolve({
				err: 0,
				msg: "OK",
				response: formatResponse(response, dateRange, startDate, endDate)
			});
		} catch (error) {
			reject({
				err: 2,
				msg: "Failed to fetch data: " + error,
			});
		}
	});

function formatResponse(response, dateRange, startDate, endDate) {
	let result = {};

	switch (dateRange) {
		case "day":
			result.yesterday = aggregateData(response, moment(startDate).subtract(1, 'day').toDate(), moment(endDate).subtract(1, 'day').toDate());
			result.today = aggregateData(response, startDate, endDate);
			break;
		case "week":
			result.lastWeek = aggregateData(response, startDate, moment().endOf('week').subtract(1, 'week').toDate());
			result.thisWeek = aggregateData(response, moment().startOf('week').toDate(), endDate);
			break;
		case "month":
			result.lastMonth = aggregateData(response, startDate, moment().endOf('month').subtract(1, 'month').toDate());
			result.thisMonth = aggregateData(response, moment().startOf('month').toDate(), endDate);
			break;
		default:
			break;
	}

	return result;
}

function aggregateData(response, startDate, endDate) {
    const data = response.filter(r => moment.utc(r.orderDate).isBetween(moment.utc(startDate), moment.utc(endDate), null, '[]'));

    const sumPrice = data.reduce((acc, curr) => {
        const price = curr.sumPrice ? parseInt(curr.sumPrice) : 0;
        return acc + price;
    }, 0);

    const numOrder = data.reduce((acc, curr) => {
        const orderCount = curr.numOrder ? parseInt(curr.numOrder) : 0;
        return acc + orderCount;
    }, 0);

    const numPhoneNumbers = data.reduce((acc, curr) => {
        const phoneCount = curr.numPhoneNumbers ? parseInt(curr.numPhoneNumbers) : 0;
        return acc + phoneCount;
    }, 0);

    return {
        sumPrice,
        numOrder,
        numPhoneNumbers
    };
}