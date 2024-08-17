import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Home = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const signinHandler = () => {
    setIsLoginActive(true);
  };

  const signupHandler = () => {
    setIsLoginActive(false);
  };

  return (
    <main className="main bg-[#ffffff]">
      <section className="page1 w-full h-screen flex">
        <div className="left w-1/2 h-full flex items-center justify-center flex-col">
          <h1 className="text-5xl font-extrabold">Notecraft</h1>

          <h2 className="text-md font-regular mb-10 opacity-80">
            Capture Every Thought, Anytime, Anywhere.
          </h2>

          <div className="form-container w-[60%] flex gap-5 flex-col items-center">
            <div className="button-container w-full flex gap-1">
              <button
                className={`py-2 px-5 rounded-[50px_0px_0px_50px] w-1/2 ${
                  isLoginActive ? "bg-blue-300" : "bg-slate-200"
                }`}
                onClick={signinHandler}
              >
                Sign in
              </button>

              <button
                className={`py-2 px-5 rounded-[0px_50px_50px_0px] w-1/2 ${
                  !isLoginActive ? "bg-blue-300" : "bg-slate-200"
                }`}
                onClick={signupHandler}
              >
                Sign up
              </button>
            </div>

            {isLoginActive ? <Login /> : <Register />}
          </div>
        </div>

        <div className="right w-1/2 h-full p-10">
          <img
            id="homepage-illustration"
            src="/images/homepage_illustration.webp"
            alt="illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
