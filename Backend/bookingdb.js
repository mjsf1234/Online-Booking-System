import mongoose from "mongoose";
const bookingSchema = mongoose.Schema({
  name: String,
  email: String,
  bookedSlots: [],
  timeStamp: String,
  id: String,
});
export default mongoose.model("userData", bookingSchema);
