import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar w-full h-[15vh] p-3 bg-white">
      <div className="navbar w-full h-full px-5 flex items-center justify-between bg-blue-200 rounded-full">
        <div className="left">
          <h1 className="text-3xl font-black">Notecraft</h1>
        </div>
        <div className="right">
          <button className="logout py-[7px] px-5 bg-transparent rounded-full border-[2px] border-blue-950 hover:bg-black hover:text-blue-200 transition-all mr-2">
            Add Note
          </button>
          <button className="logout py-[7px] px-5 bg-transparent rounded-full border-[2px] border-black hover:bg-black hover:text-red-500 transition-all">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
