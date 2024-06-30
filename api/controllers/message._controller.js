import messageModel from "../model/message.model.js";
export const createMessage = async (req, res) => {
  const { senderId, text, receiverId } = req.body;
  // console.log(req.body);
  try {
    let newMsg = new messageModel({
      members: [senderId, receiverId],
      text: text,
      senderId,
    });
    newMsg = await newMsg.save();

    res.status(201).json(newMsg);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "some thing went wrong!" });
  }
};

export const getMessage = async (req, res) => {
  const { senderId, receiverId } = req.params;

  if (!senderId || !receiverId) {
    return res
      .status(400)
      .json({ message: "Sender ID and Receiver ID are required" });
  }

  try {
    const messages = await messageModel.find({
      members: { $all: [senderId, receiverId] },
    });

    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const clearChat = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const result = await messageModel.deleteMany({
      members: { $all: [senderId, receiverId] },
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No messages found" });
    }

    res.status(200).json({ message: "Messages deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    let result = await messageModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "No message found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default { createMessage, getMessage, clearChat, deleteMessage };
