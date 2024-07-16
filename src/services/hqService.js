import { Op } from "sequelize";
import moment from 'moment-timezone';

export const getCountForPeriods = (sequelize, schemas, dateRange, Order) =>
    new Promise(async (resolve, reject) => {
        try {
            let currentStartDate, previousStartDate, currentEndDate, previousEndDate;

            const timezone = 'Asia/Bangkok';

            switch (dateRange) {
                case 'day':
                    currentStartDate = moment().tz(timezone).startOf('day').toDate();
                    previousStartDate = moment().tz(timezone).subtract(1, 'day').startOf('day').toDate();
                    currentEndDate = moment().tz(timezone).endOf('day').toDate();
                    previousEndDate = moment().tz(timezone).subtract(1, 'day').endOf('day').toDate();
                    break;
                case 'week':
                    currentStartDate = moment().tz(timezone).startOf('isoWeek').toDate();
                    previousStartDate = moment().tz(timezone).subtract(1, 'week').startOf('isoWeek').toDate();
                    currentEndDate = moment().tz(timezone).endOf('isoWeek').toDate();
                    previousEndDate = moment().tz(timezone).subtract(1, 'week').endOf('isoWeek').toDate();
                    break;
                case 'month':
                    currentStartDate = moment().tz(timezone).startOf('month').toDate();
                    previousStartDate = moment().tz(timezone).subtract(1, 'month').startOf('month').toDate();
                    currentEndDate = moment().tz(timezone).endOf('month').toDate();
                    previousEndDate = moment().tz(timezone).subtract(1, 'month').endOf('month').toDate();
                    break;
                default:
                    return reject({
                        err: 1,
                        msg: "Invalid dateRange value",
                    });
            }

            // Query to get the number of bill for the current period
            const numberOfCurrentOrderQuery = await sequelize.query(`
                SELECT SUM(row_count) AS total_rows
                FROM (
                    SELECT COUNT(*) AS row_count
                    FROM "CH_1".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                    
                    UNION ALL
                    
                    SELECT COUNT(*) AS row_count
                    FROM "CH_2".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                    
                    UNION ALL
                    
                    SELECT COUNT(*) AS row_count
                    FROM "CH_3".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                ) AS combinedOrderCounts;
            `, {
                replacements: {
                    currentStartDate,
                    currentEndDate,
                },
                type: sequelize.QueryTypes.SELECT,
            });

            const numberOfPreviousOrderQuery = await sequelize.query(`
                SELECT SUM(row_count) AS total_rows
                FROM (
                    SELECT COUNT(*) AS row_count
                    FROM "CH_1".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                    
                    UNION ALL
                    
                    SELECT COUNT(*) AS row_count
                    FROM "CH_2".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                    
                    UNION ALL
                    
                    SELECT COUNT(*) AS row_count
                    FROM "CH_3".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                ) AS combinedOrderCounts;
            `, {
                replacements: {
                    previousStartDate,
                    previousEndDate,
                },
                type: sequelize.QueryTypes.SELECT,
            });

            // Query to get the total billPrice for the current period
            const currentTotalPriceQuery = await sequelize.query(`
                SELECT SUM(CAST("billPrice" AS NUMERIC)) AS currentTotalPrice
                FROM (
                    SELECT "billPrice"
                    FROM "CH_1".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                    
                    UNION ALL
                    
                    SELECT "billPrice"
                    FROM "CH_2".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                    
                    UNION ALL
                    
                    SELECT "billPrice"
                    FROM "CH_3".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                ) AS combinedOrdersCurrent;
            `, {
                replacements: {
                    currentStartDate,
                    currentEndDate,
                },
                type: sequelize.QueryTypes.SELECT,
            });

            // Query to get the total billPrice for the previous period
            const previousTotalPriceQuery = await sequelize.query(`
                SELECT SUM(CAST("billPrice" AS NUMERIC)) AS previousTotalPrice
                FROM (
                    SELECT "billPrice"
                    FROM "CH_1".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                    
                    UNION ALL
                    
                    SELECT "billPrice"
                    FROM "CH_2".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                    
                    UNION ALL
                    
                    SELECT "billPrice"
                    FROM "CH_3".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                ) AS combinedOrdersPrevious;
            `, {
                replacements: {
                    previousStartDate,
                    previousEndDate,
                },
                type: sequelize.QueryTypes.SELECT,
            });

            // Query to get the number of bill for the current period
            const numberOfCurrentPhoneNumberQuery = await sequelize.query(`
                SELECT COUNT(DISTINCT "phoneNumber") AS distinct_phone_numbers
                FROM (
                    SELECT "phoneNumber"
                    FROM "CH_1".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                    
                    UNION ALL
                    
                    SELECT "phoneNumber"
                    FROM "CH_2".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                    
                    UNION ALL
                    
                    SELECT "phoneNumber"
                    FROM "CH_3".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                ) AS combinedPhoneNumbers;
            `, {
                replacements: {
                    currentStartDate,
                    currentEndDate,
                },
                type: sequelize.QueryTypes.SELECT,
            });

            const numberOfPreviousPhoneNumberQuery = await sequelize.query(`
                SELECT COUNT(DISTINCT "phoneNumber") AS distinct_phone_numbers
                FROM (
                    SELECT "phoneNumber"
                    FROM "CH_1".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                    
                    UNION ALL
                    
                    SELECT "phoneNumber"
                    FROM "CH_2".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                    
                    UNION ALL
                    
                    SELECT "phoneNumber"
                    FROM "CH_3".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                ) AS combinedPhoneNumbers;
            `, {
                replacements: {
                    previousStartDate,
                    previousEndDate,
                },
                type: sequelize.QueryTypes.SELECT,
            });

            // Count distinct schemas with orders for current day
            const currentCountQuery = await sequelize.query(`
                SELECT COUNT(DISTINCT schema_flag) AS tables_with_today_date
                FROM (
                    SELECT 'CH_1' AS schema_flag
                    FROM "CH_1".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                    UNION ALL
                    SELECT 'CH_2' AS schema_flag
                    FROM "CH_2".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                    UNION ALL
                    SELECT 'CH_3' AS schema_flag
                    FROM "CH_3".orders
                    WHERE date BETWEEN :currentStartDate AND :currentEndDate
                ) AS combined_results;
            `, {
                replacements: {
                    currentStartDate,
                    currentEndDate,
                },
                type: sequelize.QueryTypes.SELECT,
            });

            // Count distinct schemas with orders for previous day
            const previousCountQuery = await sequelize.query(`
                SELECT COUNT(DISTINCT schema_flag) AS tables_with_yesterday_date
                FROM (
                    SELECT 'CH_1' AS schema_flag
                    FROM "CH_1".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                    UNION ALL
                    SELECT 'CH_2' AS schema_flag
                    FROM "CH_2".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                    UNION ALL
                    SELECT 'CH_3' AS schema_flag
                    FROM "CH_3".orders
                    WHERE date BETWEEN :previousStartDate AND :previousEndDate
                ) AS combined_results;
            `, {
                replacements: {
                    previousStartDate,
                    previousEndDate,
                },
                type: sequelize.QueryTypes.SELECT,
            });

            const numOfCurrentLocation = currentCountQuery[0].tables_with_today_date || 0;
            const numOfPreviousLocation = previousCountQuery[0].tables_with_yesterday_date || 0;

            const currentTotalPrice = currentTotalPriceQuery[0].currenttotalprice || 0;
            const previousTotalPrice = previousTotalPriceQuery[0].previoustotalprice || 0;

            const numOfCurrentOrderQuery = numberOfCurrentOrderQuery[0].total_rows || 0;
            const numOfPreviousOrderQuery = numberOfPreviousOrderQuery[0].total_rows || 0;

            const numOfCurrentPhoneNumberQuery = numberOfCurrentPhoneNumberQuery[0].distinct_phone_numbers || 0;
            const numOfPreviousPhoneNumberQuery = numberOfPreviousPhoneNumberQuery[0].distinct_phone_numbers || 0;

            resolve({
                err: 0,
                msg: "OK",
                numOfCurrentLocation,
                numOfPreviousLocation,
                currentTotalPrice,
                previousTotalPrice,
                numOfCurrentOrderQuery,
                numOfPreviousOrderQuery,
                numOfCurrentPhoneNumberQuery,
                numOfPreviousPhoneNumberQuery
            });
        } catch (error) {
            reject({
                err: 2,
                msg: "Failed to fetch data: " + error,
            });
        }
    });