import { useState } from "react";
import { Header } from "./components/Header";
import { CardList } from "./components/CardList";
import { ImageOverlay } from "./components/ImageOverlay";
import { Copyright } from "./components/CopyRight";

export function Insta() {
  const [posts, setPosts] = useState([]);
  const handleNewPostSubmit = (postData) => {
    setPosts((prev) => [...prev, postData]);
  };

  return (
    <>
      <Header onAddPost={handleNewPostSubmit}/>
      <CardList posts={posts}/>
      <ImageOverlay />
      <Copyright />
    </>
  );
}
