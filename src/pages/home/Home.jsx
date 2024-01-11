import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Posts from "../../components/posts/Posts";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <Posts />
    </Layout>
  );
}

export default Home;
