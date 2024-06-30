import React from "react";
import { IoSearch } from "react-icons/io5";

function Search({ setSearchParam }) {
  const handleChange = (e) => {
    setSearchParam(e.target.value);
  };
  return (
    <div className="bg-[#FFFFFF] shadow-md  shadow-[#79C5EF] rounded-xl   py-3 px-4  ">
      <form className="flex items-center gap-4 text-xl text-[#7C7C7C] ">
        <IoSearch className="text-[25px]" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none   w-full "
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default Search;
