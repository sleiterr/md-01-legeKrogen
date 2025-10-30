// BurgerMenu/jsx

import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import s from "./Header.module.css";

export const BurgerMenu = ({ isOpen, onClose }) => {
  const handleLinkClick = () => onClose();

  return (
    <>
      <div className={`${s.overlay} ${isOpen ? s.show : ""}`}>
        <div className={s.closeIcon} onClick={onClose}>
          <IoClose size={28} />
        </div>

        <nav>
          <ul className={s.mobileNav}>
            <li className={s.listItem}>
              <Link className={s.mobLink} to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li className={s.listItem}>
              <Link className={s.mobLink} to="/about" onClick={handleLinkClick}>
                About
              </Link>
            </li>
            <li className={s.listItem}>
              <Link
                className={s.mobLink}
                to="/contact"
                onClick={handleLinkClick}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
