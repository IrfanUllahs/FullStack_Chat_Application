import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
axios.defaults.withcredentials = true
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          dispatch(
            signin({
              data: {
                googleId: res.data.id,
                name: res.data.name,
                email: res.data.email,
                image: res.data.picture,
              },
              navigate,
            })
          );
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  return (
    <div className=" h-full flex items-center justify-center flex-col gap-4">
      <img
        src="https://cdn-icons-png.freepik.com/512/4339/4339244.png"
        alt=""
        className=" h-[40%]"
      />
      <h1 className="text-blue-600 sm:text-4xl text-2xl font-bold">
        ChatterBox
      </h1>
      <p className="sm:text-2xl text-[16px] text-center text-gray-500">
        is a real time chat web application
      </p>
      <div className="h-[1px] bg-gray-500 w-[400px]"></div>
      <p className=" sm:text-2xl text-[16px] text-gray-500">signin with</p>
      <button
        className="bg-white  font-semibold py-2 px-4   rounded-full shadow-2xl border-2 border-blue-500 hover:bg-gray-100 flex items-center text-blue-700 "
        onClick={login}
      >
        <img
          src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
          alt=""
          className="h-8 w-8 mx-6"
        />
        Continue with Google
      </button>
      <p>Developed by Irfan Ullah</p>
    </div>
  );
}
export default Auth;
