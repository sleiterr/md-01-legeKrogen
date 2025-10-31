//Header.jsx

import React, { useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import { IoIosMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

// import jwtDecode from "jwt-decode";
import clsx from "clsx";

import s from "./Header.module.css";

const Header = ({ token, onLogout }) => {
  const [menuOpen, setmenuOpen] = useState(false);
  const navigate = useNavigate();

  // let guest = null;
  // if (token) {
  //   try {
  //     guest = jwtDecode(token);
  //   } catch (err) {
  //     console.error("invalid token:", err);
  //   }
  // }

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header className={s.header}>
      <div className={s.burgerIcon} onClick={() => setmenuOpen(true)}>
        <IoIosMenu size={36} />
      </div>

      <BurgerMenu isOpen={menuOpen} onClose={() => setmenuOpen(false)} />

      <nav className={s.navBar}>
        <ul className={s.navList}>
          <li className={s.listItem}>
            <Link className={s.navLink} to="/" onClick={onLogout}>
              Home
            </Link>
          </li>

          <li className={s.listItem}>
            <Link className={s.navLink} to="/product">
              Product
            </Link>
          </li>
          {token ? (
            <li className="">
              <Link
                onClick={handleLogout}
                to="/Logout"
                className={clsx(
                  "relative font-normal text-zinc-800 text-2xl px-2 py-1 cursor-pointer",
                  "before:content-[''] before:absolute before:inset-0 before:bg-red-500 before:rounded-sm before:opacity-0 before:transition-opacity before:duration-300 before:-z-10",
                  "hover:before:opacity-100 hover:text-white"
                )}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li className={s.listItem}>
              <Link
                className={clsx(
                  "relative font-normal text-zinc-800 text-2xl px-2 py-1",
                  "before:content-[''] before:absolute before:inset-0 before:bg-indigo-500 before:rounded-sm before:opacity-0 before:transition-opacity before:duration-300 before:-z-10",
                  "hover:before:opacity-100 hover:text-white"
                )}
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {/* {user && (
        <div className="font-nomal text-sm text-gray-700 py-2 ml-12">
          Logged in as :{" "}
          <span className="font-semibold text-gray-700">{user.email}</span>(
          {user.role})
        </div>
      )} */}
    </header>
  );
};

export default Header;
