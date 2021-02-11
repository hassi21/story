import "./Thumbnail.css";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../store/actions";

const Thumbnail = (props) => {
  //Dispatch variable
  const dispatch = useDispatch();

  //useState
  const [open, setOpen] = React.useState(false);
  const storyItems = useSelector((state) => state.storyItems);
  const hotSpots = useSelector((state) => state.hotSpots);

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

  let length = props.length;
  let line = props.line;
  const storyItemExtractor = (id) => {
    let u = storyItems.map((x) => {
      if (x.storyline === id) {
        return x.hotspot_set;
      }
    });
    u = u.filter((i) => {
      if (i !== undefined) {
        return i;
      }
    });
    console.log("U", u);

    let hotS = u.map((j) => {
      return j.map((o) => {
        return hotSpots.filter((k) => {
          if (o == k.id) {
            return k;
          }
        });
      });
    });
    

   
    // hotS =hotS.filter(f=>{
    //   if(f!==[]&&f!==undefined){
    //     return f;
    //   }
    // });
    
    console.log("Jero", hotS);
  
    hotS = (hotS.map((j, i) => {
      console.log("index", index, "i", i,"and",j);
      if (i == index) {
        return j.map(l=>{
          return l.map(t=>{
          console.log("rawL",t.type);
        if (t.type === "link") {
          console.log("ellink",l);
          
          return <div
            className="hotspot"
            style={{

              fontSize: `${t.font_size}`,
              textAlign: `${t.text_align}`,
              top: `${t.position_top}%`,
              left: `${t.position_left}%`,
              color: `#${t.text_hex_color}`,
            }}
            onClick={hotspotClick}
          >
            <a
              href="https://www.google.com"
              target="_blank"
              alt="This is a link"
            >
              .
            </a>
          </div>;
        } else if (t.type === "text") {
          console.log("elltext", l);
          return (
            <p
              style={{
                position: "absolute",
                fontSize: `${t.font_size}`,
                textAlign: `${t.text_align}`,
                top: `${t.position_top}%`,
                left: `${t.position_left}%`,
                color: `#${t.text_hex_color}`,
              }}
            >
              {t.content}
            </p>
          );
        }})
      })}
    }));
    // hotS=hotS.filter(x=>{if(x!==undefined || x!==[]){
    //   return x;
    // }});
    console.log("hotter", hotS);
    return hotS;
  };
  

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const leftButtonClicked = () => {
    console.log("LIndex", index);
    if (index <= length - 1 && index > 0) {
      setBg(line.storylineitem_set[index - 1].image);
      setIndex(index - 1);
    }
    console.log("Left Button Clicked", bg, index);
  };
  const rightButtonClicked = () => {
    console.log("RIndex", index);
    if (index < length - 1) {
      setBg(line.storylineitem_set[index + 1].image);
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
        {
          /* <div className="hotspot" onClick={hotspotClick}>
          <a href="https://www.google.com" target="_blank" alt="This is a link">
            .
          </a>
        </div> */
          storyItemExtractor(props.id)
        }
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
