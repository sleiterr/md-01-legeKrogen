//Header.jsx

import React, { useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";

import s from "./Header.module.css";

const Header = () => {
  const [menuOpen, setmenuOpen] = useState(false);

  return (
    <header className={s.header}>
      <div className={s.burgerIcon} onClick={() => setmenuOpen(true)}>
        <IoIosMenu size={36} />
      </div>

      <BurgerMenu isOpen={menuOpen} onClose={() => setmenuOpen(false)} />

      <nav className={s.navBar}>
        <ul className={s.navList}>
          <li className={s.listItem}>
            <Link className={s.navLink} to="/">
              Home
            </Link>
          </li>
          <li className={s.listItem}>
            <Link className={s.navLink} to="/product">
              Product
            </Link>
          </li>
          <li className={s.listItem}>
            <Link className={s.navLink} to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
