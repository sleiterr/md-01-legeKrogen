import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import NewUserForm from "./NewUserForm";
import UserList from "./UserList";

const AdminProfile = () => {
  return (
    <section className="h-screen flex flex-col items-start justify-start pt-8">
      <div className="py-[8rem] mx-auto md:max-w-7xl ">
        <div className="flex flex-row items-center gap-4">
          <Link
            to="/profile-guest"
            className={clsx(
              "relative font-normal text-xl text-stone-950",
              "before:content[''] before:absolute before:w-0 before:h-[2px] before:rounded-xs before:bg-stone-950 before:bottom-[-.25rem] before:left-0 before:transition-all before:duration-300 hover:before:w-full"
            )}
          >
            Go to Guest
          </Link>
          <div className="">
            <h2 className="font-normal text-3xl">AdminProfile</h2>
          </div>
        </div>
        <div className="w-screnn">
          <NewUserForm />
        </div>
        <div className="">
          <UserList />
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
