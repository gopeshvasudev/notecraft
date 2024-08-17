import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [passwordViewer, setPasswordViewer] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const passwordViewerHandler = () => {
    setPasswordViewer(!passwordViewer);
  };

  const formSubmitHandler = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.success) {
        navigate("/notes");
        toast.success(response.data.message);
        return reset();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message); // Directly use the error message
        return reset();
      } else {
        toast.error("An unexpected error occurred. Please try again.");
        return reset();
      }
    }
  };

  return (
    <form
      method="post"
      className="w-full p-5 bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.1)] rounded-lg flex flex-col gap-5"
      onSubmit={handleSubmit((data) => formSubmitHandler(data))}
    >
      <Toaster />
      <h1 className="text-xl font-bold text-blue-300 text-center">
        Welcome to Notecraft
      </h1>
      {errors.email && (
        <p className="text-red-600 text-sm leading-none">
          {errors.email.message}
        </p>
      )}
      <input
        autoComplete="off"
        type="email"
        name="email"
        {...register("email", { required: "Email is required" })}
        placeholder="Enter email"
        className=" rounded-md w-full p-3 outline-none border border-[#cacaca] bg-transparent text-black"
      />
      {errors.password && (
        <p className="text-red-600 text-sm leading-none">
          {errors.password.message}
        </p>
      )}

      <div className="password-input rounded-md w-full flex items-center border border-[#cacaca] px-3">
        <input
          autoComplete="off"
          type={!passwordViewer ? "password" : "text"}
          name="password"
          {...register("password", {required: "Password is required"})}
          placeholder="Enter password"
          className=" w-full py-3 outline-none bg-transparent text-black"
        />
        {!passwordViewer ? (
          <FaRegEye
            size={20}
            className="text-blue-400 cursor-pointer"
            onClick={passwordViewerHandler}
          />
        ) : (
          <FaRegEyeSlash
            size={20}
            className="text-blue-400 cursor-pointer"
            onClick={passwordViewerHandler}
          />
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-200 py-2 rounded-md hover:bg-transparent border-[2px] border-blue-200 transition-all"
      >
        Sign in
      </button>
    </form>
  );
};

export default Login;
