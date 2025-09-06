import { Schema, model } from "mongoose";

const launchSchema = new Schema({
  flight_number: { type: String, required: true },
  launch_name: { type: String, required: true },
  launch_date: { type: Date, required: true },
});

const LaunchModel = model("Launch", launchSchema);
export default LaunchModel;
