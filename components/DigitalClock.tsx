import React from 'react';

interface DigitalClockProps {
  date: Date;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ date }) => {
  // Manual formatting for maximum performance and strict adherence to YYYY-MM-DDTHH:mm:ss.SSS
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const ms = String(date.getMilliseconds()).padStart(3, '0');

  return (
    <div className="font-mono text-xl sm:text-2xl md:text-3xl text-slate-300 tracking-wider font-medium select-none text-center">
      <span className="text-slate-400">{year}-{month}-{day}</span>
      <span className="text-slate-500 mx-1">T</span>
      <span className="text-white">{hours}:{minutes}:{seconds}</span>
      <span className="text-slate-500">.</span>
      <span className="text-red-400 w-[3ch] inline-block text-left">{ms}</span>
    </div>
  );
};

export default DigitalClock;