import {
    getCountForPeriods
} from '../services/hqService.js';

import {
	Order,
	Transaction,
	Promotion,
	Client,
    sequelize,
    Store
} from "../postgres/postgres.js";

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

export const getCountForPeriodsController = async (req, res) => {
    try {
        const { dateRange } = req.params;
        const schemas = ['CH_1', 'CH_2', 'CH_3'];
        const response = await getCountForPeriods(sequelize, schemas, dateRange, Order);

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
        res.status(500).json({
            err: 2,
            msg: "Failed to fetch data: " + error,
        });
    }
};