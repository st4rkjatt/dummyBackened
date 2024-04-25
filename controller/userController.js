import UserModel from "../model/userModel.js";
import eventEmitter from 'events';
const emitter = new eventEmitter();
let addCount = 0;
let updateCount = 0;

emitter.on('update', () => {
    updateCount++;
});

emitter.on('add', () => {
    addCount++;
});

/** Create/Update User */
export const addUserController = async (req, res, next) => {
    try {
        const startTime = process.hrtime();
        
        const { name, email, id } = req.body;
        if (!name || !email) {
            return res.status(400).json({ status: false, message: "Name and Email are required" });
        }

        let user;
        if (id) {
            user = await UserModel.findByIdAndUpdate(id, { name, email }, { new: true });
            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }
            emitter.emit('update');
        } else {
            user = await UserModel.create({ name, email });
            if (!user) {
                return res.status(500).json({ status: false, message: "Failed to create user" });
            }
            emitter.emit('add');
        }

        const endTime = process.hrtime(startTime);
        const executionTime = endTime[0] * 1000 + endTime[1] / 1000000; // Convert to milliseconds

        return res.status(user ? 201 : 500).json({ status: true, data: user, count: { addCount, updateCount }, message: `User ${id ? "updated" : "created"}. Execution time: ${executionTime.toFixed(2)}ms` });

    } catch (error) {
        console.error("Error in addUserController:", error);
        return res.status(500).json({ status: false, message: error.message });
    }
};

/** Get all users */
export const getAllUserController = async (req, res, next) => {
    try {
        const startTime = process.hrtime();

        const users = await UserModel.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ status: false, data: [], message: "No users found" });
        }

        const endTime = process.hrtime(startTime);
        const executionTime = endTime[0] * 1000 + endTime[1] / 1000000; // Convert to milliseconds

        return res.status(200).json({ status: true, data: users, count: { addCount, updateCount }, message: `All users. Execution time: ${executionTime.toFixed(2)}ms` });
    } catch (error) {
        console.error("Error in getAllUserController:", error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
