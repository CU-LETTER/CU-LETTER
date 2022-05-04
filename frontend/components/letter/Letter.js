import React, { useContext } from "react";
import General from "./general/General";
import PostCard from "./postcard/PostCard";
import PhotoCard from "./photocard/PhotoCard";
import LetterContext from "../../contexts/LetterContext";
function Letter(props) {
  const { mailType } = useContext(LetterContext);
  switch (mailType) {
    case "GENERAL":
      return <General props={props} />;
    case "POSTCARD":
      return <PostCard props={props} />;
    case "PHOTOCARD":
      return <PhotoCard props={props} />;
    default:
      return <></>;
  }
}

export default Letter;
