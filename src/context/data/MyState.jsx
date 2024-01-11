import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

function MyState(props) {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [getAllPost, setGetAllPost] = useState([]);

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDb, "Post"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let postArray = [];
        QuerySnapshot.forEach((d) => {
          postArray.push({ ...d.data(), id: d.id });
        });

        setGetAllPost(postArray);
        console.log(postArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // Delete Post
  const deletePost = async (id) => {
    try {
      await deleteDoc(doc(fireDb, "Post", id));
      getAllPosts();
      toast.success("Post Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        search,
        setSearch,
        loading,
        setLoading,
        getAllPost,
        deletePost,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
