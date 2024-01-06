const logModel = require('../Models/appLogs');

module.exports = {
    createLog: async (action, message, createdBy, restaurantId, canStaffView) => {
        try {
            const log = new logModel({
                action,
                message,
                createdBy,
                restaurantId,
                canStaffView
            });
            await log.save();
            return true;
        } catch (err) {
            throw err;
        }
    },
    restaurantLogs: async (restaurantId) => {
        try {
            const logs = await logModel.find({ restaurantId });
            return logs;
        } catch (err) {
            throw err;
        }
    },
    userLogs: async (userId) => {
        try {
            const logs = await logModel.find({ createdBy: userId });
            return logs;
        } catch (err) {
            throw err;
        }
    },
    allLogs: async () => {
        try {
            const logs = await logModel.find();
            return logs;
        } catch (err) {
            throw err;
        }
    },
}