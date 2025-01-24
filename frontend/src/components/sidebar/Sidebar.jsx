import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { authUser } = useSelector((state) => state.auth);
  return (
    <div className="border border-slate-500 p-4 flex flex-col">
      <h1>Welcome {authUser.fullName}</h1>
      <SearchInput />
      <Conversations />
      <div className="divider px-3"></div>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
