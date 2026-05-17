import React from "react";

const ProfilePanel = () => {
  return (
    <div className="w-[270px] bg-[#070b18]/70 border-l border-white/10 p-5 hidden lg:block backdrop-blur-xl">
      <div className="flex flex-col items-center rounded-3xl bg-white/[0.035] border border-white/10 p-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1c2b58] to-[#0b1020] border border-white/10 flex items-center justify-center text-3xl font-light">
          C
        </div>

        <h2 className="mt-4 text-xl font-medium text-white">Convofy</h2>

        <p className="text-green-400 text-sm mt-1">Online</p>
      </div>

      <div className="mt-6 rounded-3xl bg-white/[0.035] border border-white/10 p-5">
        <h3 className="font-medium mb-2 text-white">About</h3>

        <p className="text-gray-400 text-sm leading-6">
          Building realtime chat application 🚀
        </p>
      </div>
    </div>
  );
};

export default ProfilePanel;