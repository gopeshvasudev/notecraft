import React from "react";

const Note = () => {
  return (
    <>
      <main className="main w-full bg-white p-3 pt-0">
        <section className="page1 w-full min-h-[83vh] bg-blue-200 rounded-3xl p-5 flex flex-wrap gap-5 items-start">
          <div className="card w-[200px] max-h-[250px] bg-white p-3 rounded-3xl flex flex-col justify-between gap-10 shadow-xl cursor-pointer">
            <h1 className="text-md font-semibold overflow-hidden">
              Lorem ipsum, dolor sit amet.
            </h1>
            <p className="text-xs text-blue-400">January 31, 2008</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Note;
