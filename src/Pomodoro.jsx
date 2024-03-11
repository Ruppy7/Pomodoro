import React, { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const Pomodoro = ({setAuthenticated}) => {
  const navigate = useNavigate();
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [pomodoroTime, setPomodoroTime] = useState(pomodoroDuration * 60);
  const [breakTime, setBreakTime] = useState(shortBreakDuration * 60);
  const [isPomodoroActive, setIsPomodoroActive] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(2);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isRotated, setisRotated] = useState(false);

  useEffect(() => {
    let intervalID;
    if (isActive) {
      intervalID = setInterval(() => {
        if (isPomodoroActive) {
          if (pomodoroTime > 0) {
            setPomodoroTime((prevTime) => prevTime - 1);
          } else {
            setIsPomodoroActive(false);
            setCompletedPomodoros((prevCount) => prevCount + 1);
            (completedPomodoros+1) % 3 === 0 && (completedPomodoros+1) !== 0
              ? setBreakTime(longBreakDuration * 60)
              : setBreakTime(shortBreakDuration * 60);
          }
        } else {
          if (breakTime > 0) {
            setBreakTime((prevTime) => prevTime - 1);
          } else {
            setIsPomodoroActive(true);
            setPomodoroTime(pomodoroDuration * 60);
          }
        }
      }, 1000);
    }
    return () => clearInterval(intervalID);
  }, [
    isActive,
    isPomodoroActive,
    pomodoroTime,
    breakTime,
    pomodoroDuration,
    shortBreakDuration,
  ]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPomodoroActive(true);
    setPomodoroTime(pomodoroDuration * 60);
    setBreakTime(shortBreakDuration * 60);
    setCompletedPomodoros(0);
  };

  const handlePomodoroChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 60) {
      setPomodoroDuration(value);
      if (!isActive && isPomodoroActive) {
        setPomodoroTime(value * 60);
      }
    }
  };

  const handleShortBreakChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 15) {
      setShortBreakDuration(value);
    }
  };

  const handleLongBreakChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 30) {
      setLongBreakDuration(value);
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const seconds = time % 60;
    return `${mins}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const toggleRotation = () => {
    setisRotated(!isRotated);
  }

  // const handleLogout = () => {
  //   localStorage.removeItem('accessToken');
  //   localStorage.removeItem('refreshToken');
  //   setAuthenticated(false);
  //   navigate('/login');
  // }

  return (
    <div className={`transition-all duration-1000 flex flex-col items-center justify-center min-h-screen ${isActive && isPomodoroActive ? " bg-gray-900 text-gray-700" : " bg-gray-500 text-gray-800"}`}>
      <div className=" text-3xl lg:text-5xl font-bold mb-4 text-center">Pomodoro Timer</div>
      <div className=" text-sm lg:text-lg font-bold grid grid-cols-3 gap-4 mb-4">
        <div
          className={`flex flex-col items-center p-4 rounded-lg ${
            isPomodoroActive ? " bg-blue-200" : ""
          }`}
        >
          Focus Time
          <div className=" font-normal text-lg">{pomodoroDuration} mins</div>
        </div>
        <div
          className={`flex flex-col items-center p-4 rounded-lg ${
            !isPomodoroActive && completedPomodoros % 3 !== 0
              ? "bg-green-200"
              : ""
          }`}
        >
          Short Break
          <div className=" font-normal text-lg">{shortBreakDuration} mins</div>
        </div>
        <div
          className={`flex flex-col items-center p-4 rounded-lg ${
            !isPomodoroActive && completedPomodoros % 3 === 0
              ? "bg-yellow-200"
              : ""
          }`}
        >
          Long Break
          <div className=" font-normal text-lg">{longBreakDuration} mins</div>
        </div>
      </div>
      <div className="relative">
        {isPomodoroActive && (
          <div className="absolute inset-0 bg-transparent rounded-lg"></div>
        )}
        <div
          className={`text-9xl font-bold m-4 text-center relative z-10 ${
            isPomodoroActive ? "text-blue-200" : "text-yellow-200"
          }`}
        >
          {isPomodoroActive ? formatTime(pomodoroTime) : formatTime(breakTime)}
        </div>
      </div>
      <IoSettingsOutline className={`text-blue-400 transition-all duration-700 size-10 hover:cursor-pointer ${isRotated ? 'rotate-90' : ""}`} onClick={() => {togglePanel(); toggleRotation();}} />

      <div className={`absolute top-32 left-0 rounded-lg bg-black md:bg-transparent w-48 shadow-md shadow-blue-200 text-white transform transition-transform ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'} ease-in-out duration-300 z-20`}>
        <div className="p-4">
          In Minutes <br/>
          <label htmlFor="pomodoroDuration"> Pomodoro Duration: </label>
          <input
            id="pomodoroDuration"
            type="number"
            value={pomodoroDuration}
            onChange={handlePomodoroChange}
            className="ml-2 px-2 py-1 w-16 border rounded bg-transparent"
          />
        </div>
        <div className="p-4">
          <label htmlFor="shortBreakDuration">
            Short Break Duration:
          </label>
          <input
            id="shortBreakDuration"
            type="number"
            value={shortBreakDuration}
            onChange={handleShortBreakChange}
            className="ml-2 px-2 py-1 w-16 border rounded bg-transparent"
          />
        </div>
        <div className="p-4">
          <label htmlFor="longBreakDuration">
            Long Break Duration:
          </label>
          <input
            id="longBreakDuration"
            type="number"
            value={longBreakDuration}
            onChange={handleLongBreakChange}
            className="ml-2 px-2 py-1 w-16 border rounded bg-transparent"
          />
        </div>
      </div>

      <div className=" flex space-x-4 mb-4 mt-4">
        {!isActive ? <button
          onClick={handleStart}
          className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <CiPlay1 />
        </button> : <button
          onClick={handleStop}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <CiPause1 />
        </button>}
        
        
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
        >
          <GrPowerReset />
        </button>
        {/* <button
          onClick={handleLogout}
          className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
        >
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default Pomodoro;
