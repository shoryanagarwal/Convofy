import React from "react";

const LeftSidebar = ({
  setActivePanel
}) => {

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/auth";
  };

  return (

    <div className="w-[220px] bg-[#111111] border-r border-[#1f1f1f] flex flex-col justify-between">

      <div>

        <div className="h-[70px] flex items-center px-6 border-b border-[#1f1f1f]">

          <h1 className="text-2xl font-bold">
            Convo
            <span className="text-yellow-400">
              fy
            </span>
          </h1>

        </div>

        <div className="flex flex-col gap-2 p-4">

          <button
            onClick={() =>
              setActivePanel("search")
            }
            className="h-[45px] rounded-lg bg-[#1a1a1a] text-left px-4"
          >
            Search
          </button>


           <button
            onClick={() =>
              setActivePanel("chats")
            }
            className="h-[45px] rounded-lg bg-[#1a1a1a] text-left px-4"
          >
            Chats
          </button>




          <button
            onClick={() =>
              setActivePanel("requests")
            }
            className="h-[45px] rounded-lg text-left px-4 hover:bg-[#1a1a1a]"
          >
            Requests
          </button>

          <button className="h-[45px] rounded-lg text-left px-4 hover:bg-[#1a1a1a]">
            Groups
          </button>

          <button className="h-[45px] rounded-lg text-left px-4 hover:bg-[#1a1a1a]">
            Calls
          </button>

          <button className="h-[45px] rounded-lg text-left px-4 hover:bg-[#1a1a1a]">
            Settings
          </button>

        </div>
      </div>

      <div className="p-4 border-t border-[#1f1f1f]">

        <button
          onClick={handleLogout}
          className="w-full h-[45px] rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default LeftSidebar;