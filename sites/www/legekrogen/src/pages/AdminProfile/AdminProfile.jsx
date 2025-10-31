import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const AdminProfile = () => {
  return (
    <section className="bg-blue-500 h-screen flex items-center justify-center">
      <div className="py-[8rem] mx-auto md:max-w-7xl">
        <div className="">
          <Link
            to="/profile-guest"
            className={clsx(
              "relative font-normal text-xl text-stone-950 -top-4",
              "before:content[''] before:absolute before:w-0 before:h-[2px] before:rounded-xs before:bg-stone-950 before:bottom-[-.25rem] before:left-0 before:transition-all before:duration-300 hover:before:w-full"
            )}
          >
            Go to Guest
          </Link>
        </div>
        <div className="bg-white/20 px-18 py-8 rounded-2xl">
          <h2 className="font-normal text-5xl">AdminProfile</h2>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
