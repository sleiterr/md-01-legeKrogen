import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Formik, useFormik } from "formik";
import * as Yup from "yup";

const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_URL);

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      console.log(values);
      try {
        console.log("API_URL:", API_URL);
        const res = await fetch(`${API_URL}/api/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Login was successful");
          onLogin(data.token);

          const user = jwtDecode(data.token);

          if (user.role === "admin") navigate("/admin-profile");
          else if (user.role === "guest") navigate("/profile-guest");
          else navigate("/profile");
        } else {
          toast.error(data.message || "invalid login");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong during login");
      }
    },
  });

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="py-[8rem] mx-auto md:max-w-7xl">
        <div className="mb-12">
          <h2 className="font-normal text-2xl text-zinc-800 text-center">
            Login
          </h2>
        </div>
        <div className="">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-80"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="border p-2 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="border p-2 rounded"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center cursor-pointer transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
