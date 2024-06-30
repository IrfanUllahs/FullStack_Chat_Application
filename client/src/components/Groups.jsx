import React from "react";
import ProfileCard from "./ProfileCard";

function Groups({ profiles }) {
  return (
    <div className="bg-[#FFFFFF]  shadow-md shadow-[#79C5EF]  rounded-xl py-3 px-4">
      <h1 className="text-[#303030] font-semibold text-[17px]">Groups</h1>
      {profiles.map((profile) => (
        <ProfileCard key={profile.name} profile={profile} />
      ))}
    </div>
  );
}

export default Groups;
