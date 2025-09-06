import Mongoose from "mongoose";

const connectDatabase = async (): Promise<void> => {
  try {
    await Mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

export default connectDatabase;
