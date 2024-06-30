import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    senderId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("messages", messageSchema);
