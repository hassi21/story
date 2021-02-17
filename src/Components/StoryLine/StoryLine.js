import "./StoryLine.css";
import React, { Suspense } from "react";
const Thumbnail = React.lazy(() => import("../Thumbnail/Thumbnail"));

const StoryLine = (props) => {
  return (
    <div className="storyLineContainer">
      {console.log("Props", props)}
      {props.line.storylineitem_set.map((k, index) => {
        console.log("StoryLine", k);
        return (
         <Suspense fallback={<div>.</div>}>
          <Thumbnail
            id={props.line.id}
            image={k.image}
            index={index}
            // length={props.line.storylineitem_set.length}
            className="thumbnail"
            key={index}
          />
          </Suspense>
        );
      })}
    </div>
  );
};
export default StoryLine;
