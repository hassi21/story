import View from "../View/View";
// import StoryLine from "../StoryLine/StoryLine";
import actions from "../../store/actions";
import React, { Suspense } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const StoryLine = React.lazy(() => import("../StoryLine/StoryLine"));
const Home = () => {
  //Dispatch variable
  const dispatch = useDispatch();
  //Hooks
  useEffect(() => {
    dispatch(actions.fetchStoryLines());
    dispatch(actions.fetchHotSpots());
    dispatch(actions.fetchStoryItems());
  }, []);
  //state
  const data = useSelector((state) => state.storyLines);

  return (
    <div className="homeContainer">
      <Suspense fallback={<div>Loading</div>}>
        {data !== undefined &&
          data.map((x) => {
            return <StoryLine className="storyLine" line={x} />;
          })}
      </Suspense>
    </div>
  );
};
export default Home;
