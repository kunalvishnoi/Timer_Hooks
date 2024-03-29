import React, { useState, useEffect } from "react";
import TimeFormat from "hh-mm-ss";

const Timer = () => {
  let mainTime;
  const secondsLeft = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const left = (23 - hours) * 3600 + (60 - minutes) * 60 + (60 - seconds);
    return left;
  };

  const [seconds, setSeconds] = useState(secondsLeft());
  useEffect(() => {
    startTime();
    return () => {
      stopTimer();
    };
  }, []);

  const startTime = () => {
    if (seconds && seconds > 0) {
      mainTime = setInterval(tick, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(mainTime);
  };

  const tick = () => {
    setSeconds(seconds => {
      const updatedSeconds = seconds - 1;
      if (updatedSeconds < 1) {
        stopTimer();
      }
      return updatedSeconds;
    });
  };

  const display = TimeFormat.fromS(seconds, "hh:mm:ss");
  const [h, m, s] = display.split(":");
  return (
    <div className="flex flex-column justify-center items-center" style={{ height: "100vh" }}>
      <h1 className="flex flex-column">Tomorrow In</h1>

      <div
        className="flex "
        
      >
        <div className="flex flex-column" style={{ marginRight: "20px" }}>
          <h1>{h}</h1>
          <span>HRS</span>
        </div>
        <div className="flex flex-column" style={{ marginRight: "20px" }}>
          <h1>{m}</h1>
          <span>MIN</span>
        </div>
        <div className="flex flex-column">
          <h1>{s}</h1>
          <span>SEC</span>
        </div>
      </div>
    </div>
  );
};
export default Timer;
