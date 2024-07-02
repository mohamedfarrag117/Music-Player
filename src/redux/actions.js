// src/redux/actions.js
import {
  PLAY_TRACK,
  STOP_TRACK,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  SET_VOLUME,
  SET_DURATION,
  SET_CURRENT_TIME,
} from "./actionTypes";

export const playTrack = (trackId) => {
  return (dispatch) => {
    dispatch({
      type: PLAY_TRACK,
      payload: trackId,
      dispatch,
    });
  };
};

export const stopTrack = () => {
  return (dispatch) => {
    dispatch({
      type: STOP_TRACK,
      dispatch,
    });
  };
};

export const nextTrack = () => {
  return (dispatch) => {
    dispatch({
      type: NEXT_TRACK,
      dispatch,
    });
  };
};

export const previousTrack = () => {
  return (dispatch) => {
    dispatch({
      type: PREVIOUS_TRACK,
      dispatch,
    });
  };
};

export const setVolume = (volume) => {
  return {
    type: SET_VOLUME,
    payload: volume,
  };
};

export const setDuration = (duration) => ({
  type: SET_DURATION,
  payload: duration,
});

export const setCurrentTime = (time) => ({
  type: SET_CURRENT_TIME,
  payload: time,
});
