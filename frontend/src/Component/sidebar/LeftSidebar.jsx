import React from "react";

const LeftSidebar = ({ setActivePanel }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth";
  };

  const navBtn =
    "h-[46px] rounded-xl text-left px-4 text-sm text-gray-300 hover:bg-white/[0.06] hover:text-white transition";

  return (
    <div className="w-[220px] bg-[#060914]/75 border-r border-white/10 flex flex-col justify-between backdrop-blur-xl">
      <div>
        <div className="h-[72px] flex items-center px-6 border-b border-white/10">
          <h1 className="text-2xl font-light tracking-wide text-white">
            Convo<span className="text-[#d6ad4a] font-normal">fy</span>
          </h1>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <button onClick={() => setActivePanel("search")} className={navBtn}>
            Search
          </button>

          <button onClick={() => setActivePanel("chats")} className={navBtn}>
            Chats
          </button>

          <button onClick={() => setActivePanel("requests")} className={navBtn}>
            Requests
          </button>

          <button className={navBtn}>Groups</button>
          <button className={navBtn}>Calls</button>
          <button className={navBtn}>Settings</button>
        </div>
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full h-[45px] rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;