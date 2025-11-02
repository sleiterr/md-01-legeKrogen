import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import InputField from "./InputField";
import ImgUploader from "./ImgUploader";
import Button from "./Button";

const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_URL);

const NewUserForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "guest",
    picture: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().oneOf(["admin", "guest"]).required("Role is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);
      if (values.picture) formData.append("image", values.picture);

      const res = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("token")
            ?.replace(/"/g, "")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("User created successfully!");
        resetForm();
      } else {
        toast.error(data.message || "Failed to create user");
      }
    } catch (err) {
      console.error(err);
      console.error("Something went wrong");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col">
          <div className="mb-4 self-end">
            <ImgUploader
              // label="Avatar"
              id="picture"
              onChange={(e) => setFieldValue("picture", e.target.files[0])}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <InputField
              name="name"
              value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
              placeholder="Enter Name"
            />
            <InputField
              name="email"
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              placeholder="Enter Email"
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <InputField
              name="password"
              value={values.password}
              onChange={(e) => setFieldValue("password", e.target.value)}
              placeholder="Enter password"
            />
            <InputField
              name="role"
              value={values.role}
              onChange={(e) => setFieldValue("role", e.target.value)}
              placeholder="admin or guest"
            />
          </div>
          <Button type="submit">Add User</Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewUserForm;
