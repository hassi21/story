import "./Thumbnail.css";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../store/actions";
import { useColor } from "color-thief-react";

const Thumbnail = (props) => {
  //Dispatch variable
  const dispatch = useDispatch();

  //useState
  const [open, setOpen] = React.useState(false);
  const storyItems = useSelector((state) => state.storyItems);
  const hotSpots = useSelector((state) => state.hotSpots);
  const [bg, setBg] = useState(props.image);
  const [index, setIndex] = useState(props.index);
  const storyLines = useSelector((state) => state.storyLines);
  const [id, setId] = useState(props.id);
  const { data, loading, error } = useColor("/mountains.jpg", "hex", { crossOrigin:"Anonymous", quality:1000000000})
  /*The useColor statement above uses a propositional image stored in local host.
  It is done to byPass the CORS error. Once the application is deployed on server,
   the address "/cat,jpg" will have to be replaced with storyLine.storylineitem_set[index].image.
   Once done this will change the color of background based on the image being viewed*/ 

  //styles
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: data===null?"#000":data,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      alignContent: "center",
      justifyContent: "center",
    },
  }));
 

  //Functions

  const storyLineExtractor = (id) => {
    let storyLine = storyLines.filter((f) => {
      if (f.id == id) {
        return f;
      }
    });

    storyLine = storyLine[0];
    return storyLine;
  };
  useEffect(() => {
    setBg(storyLine.storylineitem_set[index].image);
  }, [index]);
  let storyLine = storyLineExtractor(id);
  let length = storyLine.storylineitem_set.length;

  const storyItemSpec = (id) => {
    let u = storyItems.filter((x) => {
      if (x.id === id) {
        return x;
      }
    });
    return u;
  };
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
    let hotS = u.map((j) => {
      return j.map((o) => {
        return hotSpots.filter((k) => {
          if (o == k.id) {
            return k;
          }
        });
      });
    });
    hotS = hotS.map((j, i) => {
      if (i == index) {
        return j.map((l) => {
          return l.map((t) => {
            if (t.type === "link") {
              return (
                <div
                  className="hotspot"
                  style={{
                    fontSize: `${t.font_size}`,
                    textAlign: `${t.text_align}`,
                    top: `${t.position_top}%`,
                    left: `${t.position_left}%`,
                    color: `#${t.text_hex_color}`,
                  }}
                  onClick={() =>
                    hotspotInternalClick(t.link_to_story_line_item)
                  }
                ></div>
              );
            } else if (t.type === "text") {
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
            } else if (t.type === "web") {
              return (
                <div
                  className="hotspot web"
                  style={{
                    fontSize: `${t.font_size}`,
                    textAlign: `${t.text_align}`,
                    top: `${t.position_top}%`,
                    left: `${t.position_left}%`,
                    color: `#${t.text_hex_color}`,
                  }}
                  onClick={hotspotExternalClick}
                >
                  <a
                    href={`${t.external_link}`}
                    target="_blank"
                    alt="This is a link"
                  ></a>
                </div>
              );
            }
          });
        });
      }
    });
    return hotS;
  };

  const handleOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    console.log("closedYara");
    setBg(props.image);
    setId(props.id);

    setIndex(props.index);
    storyLine = [];

    setOpen(false);
  };

  const leftButtonClicked = () => {
    if (index <= length - 1 && index > 0) {
      setIndex(index - 1);
    }
  };

  const rightButtonClicked = () => {
    if (index < length - 1) {
      setIndex(index + 1);
    }
  };

  const hotspotInternalClick = (id) => {
    let item = storyItemSpec(id);
    item = item[0];
    let st = storyLineExtractor(item.storyline);
    storyLine = st;
    setId(storyLine.id);
    setIndex(item.order - 1);
  };

  const hotspotExternalClick = () => {};

  const classes = useStyles();

  // const {
  //   data,
  //   loading,
  //   error,
  // } = useColor(
  //   storyLine.storylineitem_set[index].image,
  //   "hex",
  //   { crossOrigin: "Anonymous", quality: "100" }
  // );

  const body =
    storyLine !== undefined ? (
      <div className={classes.paper}>
        <div onClick={handleClose} className="cross">X</div>
        <div
          className="imageContainer"
          style={{
            height: "100%",
            width: "414px",
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          {" "}
          {storyLine.storylineitem_set[index].is_video ? (
            <video
              style={{
                height: "100%",

                width: "100%",
                backgroundSize: "cover",
                position: "absolute",
              }}
              autoPlay
              loop
            >
              <source src={storyLine.storylineitem_set[index].video} />
            </video>
          ) : (
            <img
              id="image"
              src={bg}
              style={{
                height: "100%",
                width: "414px",
                backgroundSize: "cover",
                position: "absolute",
              }}
            ></img>
          )}
          {index > 0 && (
            <div className="leftButton" onClick={leftButtonClicked}></div>
          )}
          {index < length - 1 && (
            <div className="rightButton" onClick={rightButtonClicked}></div>
          )}
        </div>
        <div className="hotspots">{storyItemExtractor(id)}</div>
      </div>
    ) : (
      ""
    );
  let BG = props.image;

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
