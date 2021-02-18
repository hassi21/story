import "./StoryLine.css";
import React, { Suspense } from "react";
const Thumbnail = React.lazy(() => import("../Thumbnail/Thumbnail"));

const StoryLine = (props) => {
  return (
    <div className="storyLineContainer">
      {props.line.storylineitem_set.map((k, index) => {
        return (
          <Suspense fallback={<div>.</div>}>
            <Thumbnail
              id={props.line.id}
              image={k.image}
              index={index}
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
