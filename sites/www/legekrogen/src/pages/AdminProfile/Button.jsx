import React from "react";

const Button = ({ children, type = "button", ...rest }) => {
  return (
    <button
      type={type}
      {...rest}
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
