import mongoose from "mongoose";
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     require: true,
//   },
//   email: {
//     type: String,
//     require: true,
//   },
//   password: {
//     type: String,
//     require: true,
//   },
//   blockList: {
//     type: [String],
//   },
//   avatar: {
//     type: String,
//     default:
//       "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
//   },
// });
// export default mongoose.model("User", userSchema);

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  googleId: { type: String, required: true },
  blockList: {
    type: [String],
  },
  image: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
  },
  lastSeen: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
