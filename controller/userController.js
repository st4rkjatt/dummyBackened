import UserModel from "../model/userModel.js";
import eventEmitter from 'events';

// Create an event emitter
const emitter = new eventEmitter();

// Initialize counters for add and update events
let addCount = 0;
let updateCount = 0;

// Listen for 'update' event and increment updateCount
emitter.on('update', () => {
    updateCount++;
});

// Listen for 'add' event and increment addCount
emitter.on('add', () => {
    addCount++;
});

/** Create/Update User */
export const addUserController = async (req, res, next) => {
    try {
        // Record start time for performance measurement
        const startTime = process.hrtime();
        
        // Extract name, email, and id from request body
        const { name, email, id } = req.body;
        
        // Check if name and email are provided
        if (!name || !email) {
            return res.status(400).json({ status: false, message: "Name and Email are required" });
        }

        let user;

        // If id is provided, update existing user; otherwise, create new user
        if (id) {
            user = await UserModel.findByIdAndUpdate(id, { name, email }, { new: true });
            if (!user) {
                return res.status(404).json({ status: false, message: "User not found" });
            }
            // Emit 'update' event
            emitter.emit('update');
        } else {
            user = await UserModel.create({ name, email });
            if (!user) {
                return res.status(500).json({ status: false, message: "Failed to create user" });
            }
            // Emit 'add' event
            emitter.emit('add');
        }

        // Calculate execution time
        const endTime = process.hrtime(startTime);
        const executionTime = endTime[0] * 1000 + endTime[1] / 1000000; // Convert to milliseconds

        // Return response with user data, counts, and execution time
        return res.status(user ? 201 : 500).json({ status: true, data: user, count: { addCount, updateCount }, message: `User ${id ? "updated" : "created"}. Execution time: ${executionTime.toFixed(2)}ms` });

    } catch (error) {
        // Handle errors
        console.error("Error in addUserController:", error);
        return res.status(500).json({ status: false, message: error.message });
    }
};

/** Get all users */
export const getAllUserController = async (req, res, next) => {
    try {
        // Record start time for performance measurement
        const startTime = process.hrtime();

        // Retrieve all users from database
        const users = await UserModel.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ status: false, data: [], message: "No users found" });
        }

        // Calculate execution time
        const endTime = process.hrtime(startTime);
        const executionTime = endTime[0] * 1000 + endTime[1] / 1000000; // Convert to milliseconds

        // Return response with user data, counts, and execution time
        return res.status(200).json({ status: true, data: users, count: { addCount, updateCount }, message: `All users. Execution time: ${executionTime.toFixed(2)}ms` });
    } catch (error) {
        // Handle errors
        console.error("Error in getAllUserController:", error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
