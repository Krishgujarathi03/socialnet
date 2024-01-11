import { Button } from "@material-tailwind/react";
import React, { useContext, useEffect } from "react";
import MyContext from "../../context/data/MyContext";
import { useNavigate, Link } from "react-router-dom";

function Posts() {
  const context = useContext(MyContext);
  const { mode, getAllPost } = context;

  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl ">
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {/* Cards  */}
            {!getAllPost
              ? ""
              : getAllPost.slice(0, 3).map((item, index) => {
                  const { date, posts, thumbnail, id } = item;
                  return (
                    <div key={index} className="p-4 md:w-1/3">
                      <div
                        style={{
                          background:
                            mode === "dark" ? "rgb(30, 41, 59)" : "white",
                          borderBottom:
                            mode === "dark"
                              ? " 4px solid rgb(226, 232, 240)"
                              : " 4px solid rgb(30, 41, 59)",
                        }}
                        className={`h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
               ${mode === "dark" ? "shadow-gray-700" : "shadow-xl"} 
               rounded-xl overflow-hidden`}
                      >
                        {/* Thumbnail  */}
                        <img
                          onClick={() => navigate(`/postinfo/${id}`)}
                          className=" w-full"
                          src={thumbnail}
                          alt="blog"
                        />

                        {/* Top Items  */}
                        <div className="p-6">
                          {/* Date  */}
                          <h2
                            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : " rgb(30, 41, 59)",
                            }}
                          >
                            {date}
                          </h2>

                          {/* Title  */}
                          <h1
                            className="title-font text-lg font-bold text-gray-900 mb-3"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : " rgb(30, 41, 59)",
                            }}
                          >
                            {posts.title}
                          </h1>

                          {/* Description  */}
                          <p
                            className="leading-relaxed mb-3"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : " rgb(30, 41, 59)",
                            }}
                            dangerouslySetInnerHTML={createMarkup(
                              posts?.description
                            )}
                          ></p>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>

          {/* See More Button  */}

          <Link to={"/allposts"}>
            <div className="flex justify-center my-5">
              <Button
                style={{
                  background:
                    mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                  color:
                    mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
                }}
              >
                See More
              </Button>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Posts;
