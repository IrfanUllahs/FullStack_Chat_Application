import React from "react";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { useSelector } from "react-redux";

function People({ searchParam }) {
  console.log(searchParam);
  const users = useSelector((state) => state.auth.users);
  let searchUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchParam.toLowerCase())
  );

  return (
    <>
      <div className="bg-[#FFFFFF]  shadow-md shadow-[#79C5EF]  rounded-xl py-3 px-4   overflow-hidden mb-1 overflow-y-auto custom-scrollbar ">
        <h1 className="text-[#303030] font-semibold text-[17px]">Peoples</h1>
        {searchUsers.map((user) => (
          <ProfileCard key={user._id} contactUser={user} />
        ))}
      </div>
    </>
  );
}

export default People;
