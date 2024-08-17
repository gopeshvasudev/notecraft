import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [passwordViewer, setPasswordViewer] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const passwordViewerHandler = () => {
    setPasswordViewer(!passwordViewer);
  };

  const formSubmitHandler = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message); // Directly use the message from the response
      reset();
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message); // Directly use the error message
      } else {
        toast.error("An unexpected error occurred. Please try again.");
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
      <input
        autoComplete="off"
        type="text"
        name="username"
        placeholder="Enter username"
        {...register("username")}
        className=" rounded-md w-full p-3 outline-none border border-[#cacaca] bg-transparent text-black"
      />
      <input
        autoComplete="off"
        type="email"
        name="email"
        placeholder="Enter email"
        {...register("email")}
        className=" rounded-md w-full p-3 outline-none border border-[#cacaca] bg-transparent text-black"
      />
      <div className="password-input rounded-md w-full flex items-center border border-[#cacaca] px-3">
        <input
          autoComplete="off"
          type={!passwordViewer ? "password" : "text"}
          name="password"
          {...register("password")}
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
        Sign up
      </button>
    </form>
  );
};

export default Register;
