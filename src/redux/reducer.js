// src/redux/reducer.js
import {
  NEXT_TRACK,
  PLAY_TRACK,
  PREVIOUS_TRACK,
  STOP_TRACK,
  SET_VOLUME,
  SET_DURATION,
  SET_CURRENT_TIME,
} from "./actionTypes";
import { initialState } from "./initialState";
import { Howl } from "howler";
import { setCurrentTime, stopTrack } from "./actions";
let interval;

export const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_TRACK:
      if (state.currentTrack && state.currentTrack.id === action.payload) {
        if (state.currentTrack.howl) {
          if (state.isPlaying) {
            state.currentTrack.howl.pause();
            clearInterval(interval);
          } else {
            state.currentTrack.howl.play();
            interval = setInterval(() => {
              action.dispatch(setCurrentTime(state.currentTrack.howl.seek()));
            }, 1000);
          }
        } else {
          const trackToPlay = state.tracks.find(
            (track) => track.id === action.payload
          );
          if (trackToPlay) {
            const howl = new Howl({
              src: [trackToPlay.songSrc],
              html5: true,
              volume: state.volume / 100,
              onplay: () => {
                interval = setInterval(() => {
                  action.dispatch(setCurrentTime(howl.seek()));
                }, 1000);
              },
              onend: () => {
                clearInterval(interval);
                action.dispatch(setCurrentTime(0));
              },
            });
            howl.play();
            return {
              ...state,
              currentTrack: { ...trackToPlay, howl },
              isPlaying: true,
            };
          }
        }
        return {
          ...state,
          isPlaying: !state.isPlaying,
        };
      }
      return state;

    case STOP_TRACK:
      if (state.currentTrack && state.currentTrack.howl) {
        state.currentTrack.howl.stop();
        clearInterval(interval);
      }
      return {
        ...state,
        isPlaying: false,
        currentTime: 0,
      };

    case NEXT_TRACK:
      if (state.currentTrack) {
        const currentIndex = state.tracks.findIndex(
          (track) => track.id === state.currentTrack.id
        );

        let nextIndex = currentIndex + 1;
        if (nextIndex >= state.tracks.length) {
          nextIndex = 0;
        }

        const nextTrack = state.tracks[nextIndex];
        if (nextTrack) {
          if (state.currentTrack.howl) {
            state.currentTrack.howl.stop();
            clearInterval(interval);
          }

          const howl = new Howl({
            src: [nextTrack.songSrc],
            html5: true,
            volume: state.volume / 100,
            onplay: () => {
              interval = setInterval(() => {
                action.dispatch(setCurrentTime(howl.seek()));
              }, 1000);
            },
            onend: () => {
              clearInterval(interval);
              action.dispatch(setCurrentTime(0));
            },
          });

          howl.play();

          return {
            ...state,
            currentTrack: { ...nextTrack, howl },
            isPlaying: true,
          };
        }
      }
      return state;

    case PREVIOUS_TRACK:
      if (state.currentTrack) {
        const currentIndex = state.tracks.findIndex(
          (track) => track.id === state.currentTrack.id
        );
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
          prevIndex = state.tracks.length - 1;
        }

        const prevTrack = state.tracks[prevIndex];

        if (prevTrack) {
          if (state.currentTrack.howl) {
            state.currentTrack.howl.stop();
            clearInterval(interval);
          }

          const howl = new Howl({
            src: [prevTrack.songSrc],
            html5: true,
            volume: state.volume / 100,
            onplay: () => {
              interval = setInterval(() => {
                action.dispatch(setCurrentTime(howl.seek()));
              }, 1000);
            },
            onend: () => {
              clearInterval(interval);
              action.dispatch(setCurrentTime(0));
            },
          });
          howl.play();
          return {
            ...state,
            currentTrack: { ...prevTrack, howl },
            isPlaying: true,
          };
        }
      }

      return state;

    case SET_VOLUME:
      if (action.payload >= 0 && action.payload <= 100) {
        const newVolume = action.payload;
        if (state.currentTrack && state.currentTrack.howl) {
          state.currentTrack.howl.volume(newVolume / 100);
        }
        return {
          ...state,
          volume: newVolume,
        };
      }
      return state;

    case SET_DURATION:
      return {
        ...state,
        duration: action.payload,
      };

    case SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };

    default:
      return state;
  }
};
