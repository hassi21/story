import "./StoryLine.css";
import Thumbnail from "../Thumbnail/Thumbnail";

const StoryLine = (props) => {
  return (
    <div className="storyLineContainer">
      {console.log("Props", props)}
      {props.line.storylineitem_set.map((k, index) => {
        console.log("StoryLine", k);
        return (
          <Thumbnail
            image={k.image}
            index={index}
            length={props.line.storylineitem_set.length}
            line={props.line}
            className="thumbnail"
            key={index}
          />
        );
      })}
    </div>
  );
};
export default StoryLine;
