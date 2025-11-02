import React, { useState } from "react";

const ImgUploader = ({ label, id, onChange }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(e);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-base font-medium">{label}</label>}
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center w-40 h-40 bg-white border border-gray-300 border-dashed rounded-full cursor-pointer hover:border-blue-500 transition relative overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <p className="text-gray-500 text-sm text-center px-2">
            Click to upload
          </p>
        )}
      </label>
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default ImgUploader;
