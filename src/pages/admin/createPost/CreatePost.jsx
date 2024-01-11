import React, { useState, useContext, useEffect } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import MyContext from "../../../context/data/MyContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { fireDb, storage } from "../../../firebase/FirebaseConfig";
function CreatePost() {
  const context = useContext(MyContext);
  const { mode } = context;

  // eslint-disable-next-line no-unused-vars
  const [text, settext] = useState("");

  // console.log("Value: ");
  // console.log("text: ", text);

  const [posts, setPosts] = useState({
    title: "",
    description: "",
    time: Timestamp.now(),
  });
  const [thumbnail, setthumbnail] = useState();
  const navigate = useNavigate();

  // Add post
  const addPost = async () => {
    if (
      posts.title === "" ||
      posts.description === "" ||
      posts.thumbnail === ""
    ) {
      toast.error("Enter all fields");
    }
    uploadImage();
  };

  const [desc, setDesc] = useState("");

  const uploadImage = async () => {
    if (!thumbnail) return toast.error("Thumbnail is missing");

    const imgref = ref(storage, `postimage/${thumbnail.name}`);
    uploadBytes(imgref, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const productref = collection(fireDb, "Post");
        try {
          addDoc(productref, {
            posts,
            thumbnail: url,
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          });
          navigate("/dashboard");
          toast.success("Post Added Successfully");
        } catch (error) {
          toast.error("There is something wrong");
          console.log(error);
        }
      });
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto max-w-5xl py-6">
      <div
        className="p-5"
        style={{
          background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
          borderBottom:
            mode === "dark"
              ? " 4px solid rgb(226, 232, 240)"
              : " 4px solid rgb(30, 41, 59)",
        }}
      >
        {/* Top Item  */}
        <div className="mb-2 flex justify-between">
          <div className="flex gap-2 items-center">
            {/* Dashboard Link  */}
            <Link to={"/dashboard"}>
              <BsFillArrowLeftCircleFill size={25} />
            </Link>

            {/* Text  */}
            <Typography
              variant="h4"
              style={{
                color: mode === "dark" ? "white" : "black",
              }}
            >
              Create Post
            </Typography>
          </div>
        </div>

        {/* main Content  */}
        <div className="mb-3">
          {/* Thumbnail  */}
          {thumbnail && (
            <img
              className=" w-full rounded-md mb-3 "
              src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
              alt="thumbnail"
            />
          )}

          {/* Text  */}
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-semibold"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            Upload Thumbnail
          </Typography>

          {/* First Thumbnail Input  */}
          <input
            type="file"
            label="Upload thumbnail"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
            style={{
              background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
            }}
            onChange={(e) => setthumbnail(e.target.files[0])}
          />
        </div>

        {/* Second Title Input */}
        <div className="mb-3">
          <input
            label="Enter your Title"
            className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${
                   mode === "dark" ? "placeholder-black" : "placeholder-black"
                 }`}
            placeholder="Enter Your Title"
            style={{
              background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
            }}
            name="title"
            value={posts.title}
            onChange={(e) => setPosts({ ...posts, title: e.target.value })}
          />
        </div>

        {/* Four Editor  */}
        {/* <Editor
          apiKey="9jo3lu73p1xbfqaw6jvgmsbrmy7qr907nqeafe1wbek6os9d"
          onEditorChange={(newValue, editor) => {
            setPosts({ ...posts, description: newValue });
            settext(editor.getContent({ format: "text" }));
          }}
          onInit={(evt, editor) => {
            settext(editor.getContent({ format: "text" }));
          }}
        /> */}
        <div className="mb-3">
          <textarea
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
              setPosts({ ...posts, description: e.target.value });
            }}
            label="Write the Post"
            className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${
                   mode === "dark" ? "placeholder-black" : "placeholder-black"
                 }`}
            placeholder="Enter the Post"
            style={{
              background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
            }}
            name="description"
          />
        </div>

        {/* Five Submit Button  */}
        <Button
          onClick={addPost}
          className=" w-full mt-5"
          style={{
            background:
              mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
            color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default CreatePost;
