import "./Thumbnail.css";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const Thumbnail = (props) => {
  //useState
  const [open, setOpen] = React.useState(false);

  //styles
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "#6d6963",
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      // padding: theme.spacing(2, 4, 3),
      alignContent: "center",
      justifyContent: "center",
    },
  }));
  const [bg, setBg] = useState(props.image);
  // const [stroyLines,setStoryLines] = useState(props.line);
  const [index, setIndex] = useState(props.index);
  console.log("set the variables");
  // let index = props.index;
  let length = props.length;
  let line = props.line;
  

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setBg(null);
    // setIndex(null);
  };
  const leftButtonClicked = () => {
    console.log("LIndex", index);
    if (index <= length - 1 && index > 0) {
      setBg(line.storylineitem_set[index-1].image);
      setIndex(index - 1);
    }
    console.log("Left Button Clicked", bg, index);
  };
  const rightButtonClicked = () => {
    console.log("RIndex", index);
    if (index < length - 1) {
      setBg(line.storylineitem_set[index+1].image);
      setIndex(index + 1);
    }
    console.log("Right Button Clicked", bg, index);
  };
  const hotspotClick = () => {
    console.log("Hotspot Clicked");
  };
  const classes = useStyles();
  const body = (
    <div className={classes.paper}>
      <div
        className="imageContainer"
        style={{
          backgroundImage: `url("${bg}")`,
          height: "100%",
          width: "414px",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        {index > 0 && (
          <div className="leftButton" onClick={leftButtonClicked}></div>
        )}
        {index < props.length - 1 && (
          <div className="rightButton" onClick={rightButtonClicked}></div>
        )}
      </div>
      <div className="hotspots">
        <div className="hotspot" onClick={hotspotClick}>
          <a href="https://www.google.com" target="_blank" alt="This is a link">
            .
          </a>
        </div>
      </div>
    </div>
  );
  let BG = props.image;
  console.log("Background", BG);
  return (
    <div
      style={{
        backgroundImage: `url("${BG}")`,
        backgroundSize: "cover  ",
      }}
      className="thumbnailContainer"
      onClick={handleOpen}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default Thumbnail;
