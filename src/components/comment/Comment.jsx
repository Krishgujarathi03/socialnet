import { Button } from "@material-tailwind/react";
import React, { useContext } from "react";
import MyContext from "../../context/data/MyContext";

function Comment({
  addReply,
  name,
  setName,
  replyText,
  setReplyText,
  allReply,
}) {
  const context = useContext(MyContext);
  const { mode } = context;
  return (
    <section className=" py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2
            className="text-lg lg:text-2xl font-bold"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            Reply
          </h2>
        </div>
        {/* Reply Form  */}
        <form className="mb-6">
          {/* Name Input  */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
            shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
            style={{
              background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Your Name"
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 "
              style={{
                color: mode === "dark" ? "white" : "black",
                background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
              }}
            />
          </div>

          {/* Text Area  */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
          shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200 "
            style={{
              background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
            }}
          >
            <label htmlFor="reply" className="sr-only">
              Your reply
            </label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              id="reply"
              rows={6}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 "
              style={{
                color: mode === "dark" ? "white" : "black",
                background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
              }}
              placeholder="Write Something"
              required
              defaultValue={""}
            />
          </div>
          {/* Button  */}
          <div className="">
            {name && replyText ? (
              <Button
                onClick={addReply}
                style={{
                  background:
                    mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                  color:
                    mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
                }}
              >
                Reply
              </Button>
            ) : (
              <Button
                style={{
                  background:
                    mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                  color:
                    mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
                }}
              >
                Reply
              </Button>
            )}
          </div>
        </form>

        {/* Bottom Item  */}
        <article
          className="p-6 mb-6 text-base rounded-lg "
          style={{
            background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
          }}
        >
          {allReply?.map((item, index) => {
            const { name, date, replyText } = item;
            return (
              <>
                <footer
                  key={index}
                  className="flex justify-between items-center mb-"
                >
                  <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg ">
                    <p
                      className="inline-flex items-center mr-3 text-lg  "
                      style={{ color: mode === "dark" ? "black" : "black" }}
                    >
                      {name}
                    </p>
                    <p
                      className="text-sm "
                      style={{ color: mode === "dark" ? "black" : "black" }}
                    >
                      {date}
                    </p>
                  </div>
                </footer>
                <p
                  className="text-gray-500 dark:text-gray-400 text-md"
                  style={{ color: mode === "dark" ? "white" : "black" }}
                >
                  ↳ {replyText}
                </p>
              </>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default Comment;
