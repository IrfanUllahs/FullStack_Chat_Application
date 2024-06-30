import conversationModel from "../model/conversation.model.js";
export const createConversation = async (req, res) => {
  const { receiverId, senderId } = req.body;
  try {
    const newConversation = new conversationModel({
      members: [receiverId, senderId],
    });
    const savedConversation = await newConversation.save();
    res.status(201).json({ message: "conversation Created!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "some thing went wrong!" });
  }
};
export const getConversation = async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(userId, "userId get conversations");
    const conversation = await conversationModel.find({
      members: { $in: [userId] },
    });
    if (!conversation) {
      res.status(401).json({ message: "Not found!" });
    }
    res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "some thing went wrong!" });
  }
};
export default { createConversation, getConversation };
