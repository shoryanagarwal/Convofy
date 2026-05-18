import React from "react";

const LeftSidebar = ({ setActivePanel }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // go to home page after logout
    window.location.href = "/";
  };

 const navBtn =
     "h-[46px] rounded-xl px-2 md:px-4 text-sm text-gray-300 hover:bg-white/[0.06] hover:text-white transition flex items-center justify-center md:justify-start";
  
  
    return (
    <div className="w-16 md:w-55 h-full bg-[#060914]/75 border-r border-white/10 flex flex-col justify-between backdrop-blur-xl">
      <div>
        <div className="h-18 flex items-center px-6 border-b border-white/10">
          <h1 className="hidden md:block text-2xl font-light tracking-wide text-white">
            Convo<span className="text-[#d6ad4a] font-normal">fy</span>
          </h1>
        </div>





        <div className="flex flex-col gap-2 p-4">
          <button onClick={() => setActivePanel("search")} className={navBtn}>
            <span className="md:hidden">S</span>
            <span className="hidden md:inline">Search</span>
          </button>

          <button onClick={() => setActivePanel("chats")} className={navBtn}>
  <span className="md:hidden">C</span>
  <span className="hidden md:inline">Chats</span>
</button>

<button onClick={() => setActivePanel("requests")} className={navBtn}>
  <span className="md:hidden">R</span>
  <span className="hidden md:inline">Requests</span>
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