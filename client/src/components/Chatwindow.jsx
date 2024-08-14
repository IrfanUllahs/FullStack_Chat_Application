import React, { useEffect, useRef, useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
// import { socket } from "../utils/socket";
import Search from "./Search";
import People from "./People";
import { useSelector, useDispatch } from "react-redux";
import {
  sendMessage,
  setMessageinRedux,
  setSendMessage,
  clearMessages,
  setRecievedMessage,
  getMessages,
} from "../redux/features/messageSlice";

import {
  setUser,
  setIsBlockedbyHim,
  setIsBlockedbyMe,
  setCurrentUser,
  getUsers,
} from "../redux/features/authSlice";
import Message from "./Message";
import { format } from "timeago.js";

import { toast } from "react-toastify";
import MenuOption from "./Menu";
import axios from "axios";
import { useParams } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_URL;
function Chatwindow() {
  const [searchParam, setSearchParam] = useState("");
  const [isError, setIsError] = useState("");

  const isBlockedbyMe = useSelector((state) => state.auth.isBlockedbyMe);
  const isBlockedbyHim = useSelector((state) => state.auth.isBlockedbyHim);
  const scrollRef = useRef();
  const user = useSelector((state) => state.auth.user);
  const currentUser = useSelector((state) => state.auth.currentUser);

  let recievedMessage = useSelector((state) => state.message.recievedMessage);
  let messages = useSelector((state) => state.message.messages);
  let sendMessages = useSelector((state) => state.message.sendMessages);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const messageLoading = useSelector((state) => state.message.isLoading);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [data, setdata] = useState({
    senderId: user?.userData?._id,
    receiverId: currentUser?._id,
    text: "",
  });
  // useEffect(() => {
  //   if (user?.userData?._id) {
  //     socket.emit("add user", user?.userData?._id);
  //     socket.on("get users", (users) => {
  //       console.log(users);
  //     });
  //   }
  // }, [user?.userData]);
  useEffect(() => {
    if (user?.userData?._id) {
      setdata((prev) => ({ ...prev, senderId: user?.userData?._id }));
    }
    if (currentUser?._id) {
      setdata((prev) => ({ ...prev, receiverId: currentUser?._id }));
    }
  }, [currentUser?._id, user?.userData?._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser._id) return;
    if (isBlockedbyHim || isBlockedbyMe) {
      console.log("blocked case ");
    }
    if (data.text == "") return;

    dispatch(sendMessage({ data }));

    dispatch(
      setSendMessage({
        ...data,
        receiverId: currentUser?._id,
      })
    );
    setdata((data) => ({ ...data, text: "" }));
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("first");
        let result = await axios.get(`${baseURL}/api/user/${id}`);

        dispatch(setCurrentUser(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (!user?.userData?._id) {
      fetchUser();
    }
  }, []);
  useEffect(() => {
    const fetchMessages = (data) => {
      dispatch(getMessages(data));
    };

    if (currentUser) {
      const data = {
        senderId: user?.userData?._id,
        receiverId: currentUser?._id,
      };
      fetchMessages(data);
    }
  }, [currentUser?._id]);
  useEffect(() => {
    const fetchUser = async () => {
      dispatch(getUsers(user?.userData?._id));
    };

    if (user?.userData?._id) {
      fetchUser();
    }
  }, [user?.userData?._id]);
  const handleChanges = (e) => {
    setdata((data) => ({ ...data, text: e.target.value }));
  };
  const isBlock = (currentUser, user) => {
    dispatch(
      setIsBlockedbyMe(
        user?.userData?.blockList?.some(
          (blockUser) => blockUser == currentUser?._id
        )
      )
    );

    dispatch(
      setIsBlockedbyHim(
        currentUser?.blockList.some(
          (blockUser) => blockUser == user?.userData?._id
        )
      )
    );
  };
  useEffect(() => {
    if (sendMessages !== null) {
      // socket.emit("sendMessage", sendMessages);
      console.log(sendMessages);
    }
  }, [sendMessages]);

  useEffect(() => {
    if (recievedMessage != null) {
      dispatch(setMessageinRedux(recievedMessage));
    }
  }, [recievedMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (currentUser?._id) {
      isBlock(currentUser, user);
    }
  }, [currentUser, user]);

  const handleBlock = async () => {
    try {
      let result = await axios.post(
        `${baseURL}/api/user/block/${user?.userData?._id}/${currentUser?._id}`
      );
      let storedUser = JSON.parse(localStorage.getItem("user"));
      storedUser.userData = { ...storedUser.userData, ...result.data.userData };
      localStorage.setItem("user", JSON.stringify(storedUser));
      dispatch(setUser(storedUser));
      toast.success("user blocked");
    } catch (error) {
      toast.error("not blocked error");
      console.log(error.response.data.message);
    }
  };
  const handleUnlbock = async () => {
    try {
      let result = await axios.patch(
        `${baseURL}/api/user/unblock/${user?.userData?._id}/${currentUser?._id}`
      );
      let storedUser = JSON.parse(localStorage.getItem("user"));
      storedUser.userData = { ...storedUser.userData, ...result.data.userData };
      localStorage.setItem("user", JSON.stringify(storedUser));
      console.log(storedUser);
      dispatch(setUser(storedUser));
      toast.success("user Un-blocked");
    } catch (error) {
      toast.error("not remove");
      console.log(error.response.data.message);
    }
  };

  const clearChat = async (block) => {
    console.log(block);
    if (block) {
      toast.warning("you is blocked by Him,can not Clear");
      return;
    }
    try {
      let result = await axios.delete(
        `${baseURL}/api/message/clearchat/${user?.userData?._id}/${currentUser?._id}`
      );
      console.log(result);
      dispatch(clearMessages());
      toast.success("message were cleared");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // useEffect(() => {
  //   if (currentUser?._id) {
  //     socket.emit("handleblock", {
  //       id: currentUser?._id,
  //       isBlockedbyMe,
  //     });
  //   }
  // }, [isBlockedbyMe]);
  // useEffect(() => {
  //   socket.on("blockOrUnblock", (user) => {
  //     dispatch(setIsBlockedbyHim(user));
  //     console.log(user);
  //   });
  // }, []);
  useEffect(() => {
    const auth = localStorage.getItem("user");

    if (!auth) {
      navigate("/auth");
    }
  }, []);
  return (
    <div className="flex h-full gap-5  ">
      <div className="md:flex flex-col gap-10 md:flex-1 hidden  ">
        {/* <Groups profiles={profiles} /> */}
        {user && (
          <>
            <Search setSearchParam={setSearchParam} />
            {isLoading ? (
              <h1 className="text-[#303030] font-semibold text-[17px] text-center mt-[40px]">
                Loading...
              </h1>
            ) : (
              <People searchParam={searchParam} />
            )}
          </>
        )}
      </div>

      <div className="  flex-[2_2_0%]  pb-2   ">
        <div className="bg-[#FFFFFF]  shadow-lg shadow-[#79C5EF] rounded-lg   py-3 px-4 flex flex-col h-full gap-5 ">
          {/* user information Section */}
          <div className="flex justify-between border-b border-[#B4ABAB] pb-4   ">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.image}
                alt="profile picture"
                className="rounded-full sm:h-12 sm:w-12 w-9 h-9"
              />
              <div className="flex flex-col gap-[1px]">
                <h1 className="text-[#303030] font-semibold md:text-[16px] text-[13px]">
                  {currentUser?.name}
                </h1>
                {/* last seen section is here */}
                <p className="text-[#7C7C7C] md:text-[15px] text-[10px]">
                  {"Last Seen " + format(currentUser?.lastSeen)}
                </p>
              </div>
            </div>
            <div className="flex items-center md:gap-6 gap-3">
              <IoCallOutline className="md:text-3xl text-xl  text-[#9747FF] hover:text-[#653e98] cursor-pointer" />
              <IoVideocamOutline className="md:text-3xl text-xl  text-[#9747FF] hover:text-[#653e98] cursor-pointer" />

              <MenuOption
                method1={handleBlock}
                method2={clearChat}
                block={isBlockedbyHim}
              />
            </div>
          </div>
          {/* message section */}
          <div className=" flex-1 flex flex-col gap-4 overflow-hidden overflow-y-auto custom-scrollbar pr-2  ">
            {isBlockedbyHim || isBlockedbyMe ? (
              isBlockedbyMe ? (
                <>
                  <span className="text-red-500 text-xl font-bold text-center mt-16">
                    Blocked by YOU
                  </span>
                  <div
                    className="bg-[#9747FF] text-white w-fit px-3 py-4 rounded-lg mx-auto mt-11 hover:shadow-xl shadow-black cursor-pointer hover:border-2 border-gray-400"
                    onClick={handleUnlbock}
                  >
                    Un-Block
                  </div>
                </>
              ) : (
                <span className="text-red-500 text-xl font-bold text-center mt-16">
                  you is blocked by Him
                </span>
              )
            ) : messageLoading ? (
              <h1 className="text-[#303030] font-semibold text-[17px] text-center mt-[40px]">
                Loading...
              </h1>
            ) : (
              messages?.map((message) => (
                <div
                  key={message._id}
                  ref={scrollRef}
                  className=" flex flex-col"
                >
                  <Message
                    message={message}
                    key={message._id}
                    own={message.senderId == user?.userData?._id}
                  />
                </div>
              ))
            )}
          </div>
          <div className="border border-gray-200 text-[14px]  bg-[#EFF6FC] sm:h-[50px] py-1 flex items-center px-5 rounded-lg">
            <form
              className=" w-full h-full flex items-center justify-between"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Type here"
                className="w-full bg-inherit h-full outline-none text-[16px] text-[#303030] "
                onChange={handleChanges}
                disabled={isBlockedbyHim || isBlockedbyMe}
                value={data.text}
              />
              <FaLocationArrow
                className="sm:h-8 sm:w-8 h-5 w-5 text-[#9747FF] rotate-45 "
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatwindow;
