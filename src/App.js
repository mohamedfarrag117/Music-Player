// src/App.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  playTrack,
  stopTrack,
  nextTrack,
  previousTrack,
  setVolume,
  setCurrentTime,
} from "./redux/actions";
import "./App.css";

function App() {
  const { tracks, currentTrack, isPlaying, volume, currentTime } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const handlePlay = () => {
    if (currentTrack) {
      dispatch(playTrack(currentTrack.id));
    }
  };

  const handleStop = () => {
    dispatch(stopTrack());
  };

  const handleNext = () => {
    dispatch(nextTrack());
  };

  const handlePrevious = () => {
    dispatch(previousTrack());
  };

  const handleVolumeChange = (e) => {
    if (isMuted) setIsMuted(false);
    const newVolume = e.target.value;
    dispatch(setVolume(newVolume));
  };

  const handleMute = () => {
    if (isMuted) {
      dispatch(setVolume(previousVolume));
    } else {
      setPreviousVolume(volume);
      dispatch(setVolume(0));
    }
    setIsMuted(!isMuted);
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    if (currentTrack.howl) {
      currentTrack.howl.seek(seekTime);
      dispatch(setCurrentTime(seekTime));
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className=" bg-app-background bg-cover bg-center min-h-screen flex flex-col  justify-center items-center p-10 overflow-hidden ">
      <div className=" bg-opacity-0 backdrop-blur-sm p-10  rounded-xl shadow-2xl flex lg:flex-row  flex-col  items-center  border-gray-300 relative z-10 w-[1500px]  overflow-hidden ">
        {currentTrack ? (
          <>
            <div className="text-slate-200 semibold  flex flex-col justify-center items-center p-5 ">
              <div className="p-2 w-80 text-center font-semibold">
                {currentTrack.title}
              </div>
              <div className="p-2 w-80 text-center ">{currentTrack.Artist}</div>
            </div>

            <img
              className="  rounded-xl w-48 h-48 lg:w-64 lg:h-64 object-cover transition transform hover:scale-95 hover:shadow-lg truncate relative self-center"
              src={currentTrack.cover}
              alt={currentTrack.title}
            />
            <div className="buttons flex flex-row justify-center items-center  m-5 p-5">
              <button
                class="rounded-full lg:w-8 lg:h-8 w-7 h-7 flex items-center justify-center pl-0.5 ring-2 ring-red-500 focus:outline-none bg-red-500 hover:bg-red-600 text-white m-3 transition ease-in"
                onClick={handlePrevious}
              >
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentcolor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="19 20 9 12 19 4 19 20"></polygon>
                  <line x1="5" y1="19" x2="5" y2="5"></line>
                </svg>
              </button>

              <button
                class="rounded-full lg:w-12 lg:h-12 w-10 h-10 flex items-center justify-center pl-0.5 ring-2 ring-red-500 focus:outline-none bg-red-500 hover:bg-red-600 text-white m-3 transition ease-in"
                onClick={handlePlay}
              >
                {isPlaying ? (
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentcolor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentcolor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>

              <button
                className="rounded-full lg:w-12 lg:h-12 w-10 h-10 flex items-center justify-center pl-0.5 ring-2 ring-red-500 focus:outline-none bg-red-500 hover:bg-red-600 text-white m-3 transition ease-in"
                onClick={handleStop}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentcolor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="6" y="6" width="12" height="12"></rect>
                </svg>
              </button>

              <button
                class="rounded-full lg:w-8 lg:h-8 w-7 h-7 flex items-center justify-center pl-0.5 ring-2 ring-red-500 focus:outline-none bg-red-500 hover:bg-red-600 text-white m-3 transition ease-in"
                onClick={handleNext}
              >
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentcolor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <line x1="19" y1="5" x2="19" y2="19"></line>
                </svg>
              </button>

              <div className="volume-control lg:flex hidden items-center gap-2 ">
                <button
                  className="rounded-full lg:w-9 lg:h-9 w-8 h-8 flex items-center justify-center pl-0.5 ring-1 ring-red-400 text-red-400 hover:bg-red-400 hover:text-slate-900  focus:outline-none transition ease-in"
                  onClick={handleMute}
                >
                  {isMuted ? (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentcolor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                      <path d="M19 12a7 7 0 0 0-7-7v0a7 7 0 0 0-7 7v0a7 7 0 0 0 7 7v0a7 7 0 0 0 7-7z"></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentcolor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="4 7 4 17 9 17 15 22 15 2 9 7 4 7"></polygon>
                      <path d="M19 12a7 7 0 0 0-7-7v0a7 7 0 0 0-7 7v0a7 7 0 0 0 7 7v0a7 7 0 0 0 7-7z"></path>
                    </svg>
                  )}
                </button>
                <input
                  className="lg:w-20 w-10 h-2 rounded-lg overflow-hidden appearance-none bg-red-500  "
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>

            <div className="track-progress flex items-center gap-2 ">
              <span className="text-white">{formatTime(currentTime)}</span>
              <input
                className="w-full rounded-lg overflow-hidden appearance-none bg-red-500 h-2"
                type="range"
                min="0"
                max={currentTrack.howl ? currentTrack.howl.duration() : 0}
                value={currentTime}
                onChange={handleSeek}
              />
              <span className="text-white">
                {currentTrack.howl
                  ? formatTime(currentTrack.howl.duration())
                  : "0:00"}
              </span>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default App;
