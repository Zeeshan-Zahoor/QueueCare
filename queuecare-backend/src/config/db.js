import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance =  await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
        return connectionInstance;

    } catch (error) {
        console.log("Database connection was failed: ", error.message);
        process.exit(1);
    }
}