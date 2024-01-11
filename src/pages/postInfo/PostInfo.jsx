import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/data/MyContext";
import { useParams } from "react-router-dom";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";
import Comment from "../../components/comment/Comment";

function PostInfo() {
  const context = useContext(MyContext);
  const { mode, loading, setLoading } = context;

  // To get the postid
  const params = useParams();
  console.log(params.id);

  // Get Posts
  const [getPosts, setGetPosts] = useState();

  useEffect(() => {
    const getAllPosts = async () => {
      setLoading(true);
      try {
        const product = await getDoc(doc(fireDb, "Post", params.id));
        if (product) {
          setGetPosts(product.data());
        } else {
          console.log("Item not found");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllPosts();
    window.scrollTo(0, 0);
  }, [params.id, setLoading]);

  // Replys
  const [name, setName] = useState("");
  const [replyText, setReplyText] = useState("");

  const addReply = async () => {
    const replyRef = collection(fireDb, `Post/${params.id}/reply`);
    try {
      await addDoc(replyRef, {
        name,
        replyText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      setName("");
      setReplyText("");
    } catch (error) {
      console.log(error);
    }
  };

  const [allReply, setAllReply] = useState();

  useEffect(() => {
    const getReply = async () => {
      try {
        const q = query(
          collection(fireDb, `Post/${params.id}/reply`),
          orderBy("time")
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let replyArray = [];
          QuerySnapshot.forEach((d) => {
            replyArray.push({ ...d.data(), id: d.id });
          });
          setAllReply(replyArray);
        });
        return () => data;
      } catch (error) {
        console.log(error);
      }
    };
    getReply();
    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <Layout>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4 ">
        <div className=" py-4 lg:py-8">
          {loading ? (
            <Loader />
          ) : (
            <div>
              {/* Thumbnail  */}
              <img
                alt="content"
                className="mb-3 rounded-lg h-full w-full"
                src={getPosts?.thumbnail}
              />
              {/* title And date  */}
              <div className="flex justify-between items-center mb-3">
                <h1
                  style={{ color: mode === "dark" ? "white" : "black" }}
                  className=" text-xl md:text-2xl lg:text-2xl font-semibold"
                >
                  {getPosts?.posts?.title}
                </h1>
                <p style={{ color: mode === "dark" ? "white" : "black" }}>
                  {getPosts?.date}
                </p>
              </div>
              <div
                className={`border-b mb-5 ${
                  mode === "dark" ? "border-gray-600" : "border-gray-400"
                }`}
              />

              {/* Post Content  */}
              <div className="content">
                <div
                  style={{ color: mode === "dark" ? "white" : "black" }}
                  className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                  ${
                    mode === "dark"
                      ? "[&>h1]:text-[#ff4d4d]"
                      : "[&>h1]:text-black"
                  }

                  [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
                  ${mode === "dark" ? "[&>h2]:text-white" : "[&>h2]:text-black"}

                  [&>h3]:text-[18.72] [&>h3]:font-bold [&>h3]:mb-2.5
                  ${mode === "dark" ? "[&>h3]:text-white" : "[&>h3]:text-black"}

                  [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
                  ${mode === "dark" ? "[&>h4]:text-white" : "[&>h4]:text-black"}

                  [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
                  ${mode === "dark" ? "[&>h5]:text-white" : "[&>h5]:text-black"}

                  [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
                  ${mode === "dark" ? "[&>h6]:text-white" : "[&>h6]:text-black"}

                  [&>p]:text-[16px] [&>p]:mb-1.5
                  ${
                    mode === "dark"
                      ? "[&>p]:text-[#7efff5]"
                      : "[&>p]:text-black"
                  }

                  [&>ul]:list-disc [&>ul]:mb-2
                  ${mode === "dark" ? "[&>ul]:text-white" : "[&>ul]:text-black"}

                  [&>ol]:list-decimal [&>li]:mb-10
                  ${mode === "dark" ? "[&>ol]:text-white" : "[&>ol]:text-black"}

                  [&>li]:list-decimal [&>ol]:mb-2
                  ${mode === "dark" ? "[&>ol]:text-white" : "[&>ol]:text-black"}

                  [&>img]:rounded-lg
                  `}
                >
                  {getPosts?.posts?.description}
                </div>
              </div>
            </div>
          )}
        </div>
        <Comment
          addReply={addReply}
          name={name}
          setName={setName}
          replyText={replyText}
          setReplyText={setReplyText}
          allReply={allReply}
        />
      </section>
    </Layout>
  );
}

export default PostInfo;
