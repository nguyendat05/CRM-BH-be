import {
    getsAllData
} from '../services/zaloService.js';

import {
	Zalo
} from "../postgres/postgres.js";

export const getsZaloDataController = async (req, res) => {
	try {
		const response = await getsAllData(Zalo);

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