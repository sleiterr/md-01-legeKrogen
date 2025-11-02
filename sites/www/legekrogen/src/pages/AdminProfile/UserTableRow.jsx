import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export const UserTableRow = ({ align = "left", children }) => {
  return <td className={clsx("py-2 px-5", `text-${align}`)}>{children}</td>;
};

UserTableRow.propTypes = {
  alig: PropTypes.oneOf(["left", "center", "right"]),
  children: PropTypes.node,
};
