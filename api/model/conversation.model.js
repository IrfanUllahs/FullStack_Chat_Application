import mongoose from "mongoose";
const conversationModel = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
export default mongoose.model("conversation", conversationModel);
