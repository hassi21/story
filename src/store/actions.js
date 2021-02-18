import constants from "./constants";
import services from "../services";

const fetchStoryLines = () => {
  return (dispatch) => {
    try {
      const response = services.fetchStoryLines();
      dispatch({
        type: constants.FETCH_STORYLINES,
        payload: { storyLines: response },
      });
    } catch (error) {}
  };
};
const fetchHotSpots = () => {
  return (dispatch) => {
    try {
      const response = services.fetchHotSpots();
      dispatch({
        type: constants.FETCH_HOTSPOTS,
        payload: { hotSpots: response },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
const fetchStoryItems = () => {
  return (dispatch) => {
    try {
      const response = services.fetchStoryItems();
      dispatch({
        type: constants.FETCH_STORY_ITEMS,
        payload: { storyItems: response },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default {
  fetchStoryLines,
  fetchHotSpots,
  fetchStoryItems,
};
