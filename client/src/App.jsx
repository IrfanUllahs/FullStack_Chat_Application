import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuBar from "./components/MenuBar";

import Messanger from "./pages/Messanger";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";

import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Chatwindow from "./components/Chatwindow";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user")));
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  }, []);
  return (
    <div className="h-screen bg-[#EFF6FC] p-6 flex gap-5 sm:flex-row flex-col overflow-hidden border-2 border-red-600 ">
      <BrowserRouter>
        <MenuBar />
        <ToastContainer
          position="top-left"
          autoClose={1500}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={false}
          draggable={true}
          theme="dark"
        />
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Messanger />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/chat/:id" element={<Chatwindow />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
