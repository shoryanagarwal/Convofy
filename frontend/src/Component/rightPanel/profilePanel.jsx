import React from "react";

const ProfilePanel = () => {

  return (
    <div className="w-[260px] bg-[#0f0f10] border-l border-[#1f1f1f] p-5 hidden lg:block">

      <div className="flex flex-col items-center">

        <div className="w-24 h-24 rounded-full bg-gray-700"></div>

        <h2 className="mt-4 text-xl font-semibold">
          Convofy
        </h2>

        <p className="text-green-400 text-sm mt-1">
          Online
        </p>

      </div>

      <div className="mt-8">

        <h3 className="font-semibold mb-2">
          About
        </h3>

        <p className="text-gray-400 text-sm leading-6">
          Building realtime chat application 🚀
        </p>

      </div>

    </div>
  );
};

export default ProfilePanel;