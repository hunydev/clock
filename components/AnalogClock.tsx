import React, { useMemo } from 'react';

interface AnalogClockProps {
  date: Date;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ date }) => {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const ms = date.getMilliseconds();

  // Calculate angles with smooth movement
  // Seconds: 6 degrees per second, plus fraction of second based on MS
  const secondAngle = (seconds + ms / 1000) * 6;
  
  // Minutes: 6 degrees per minute, plus fraction based on seconds
  const minuteAngle = (minutes + seconds / 60) * 6;

  // Hours: 30 degrees per hour, plus fraction based on minutes
  const hourAngle = ((hours % 12) + minutes / 60) * 30;

  // Memoize static clock face elements to avoid recalculating on every render
  const { hourMarks, minuteMarks } = useMemo(() => {
    const hMarks = [];
    const mMarks = [];

    // Hour Numbers
    for (let i = 1; i <= 12; i++) {
      const angle = i * 30;
      const radians = (angle - 90) * (Math.PI / 180);
      const radius = 80; // Distance from center
      const x = 100 + radius * Math.cos(radians);
      const y = 100 + radius * Math.sin(radians);
      hMarks.push(
        <text
          key={`h-${i}`}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize="14"
          fontWeight="600"
          className="font-mono"
        >
          {i}
        </text>
      );
    }

    // Minute Dots
    for (let i = 0; i < 60; i++) {
      if (i % 5 === 0) continue; // Skip where numbers are
      const angle = i * 6;
      const radians = (angle - 90) * (Math.PI / 180);
      const radius = 88;
      const x = 100 + radius * Math.cos(radians);
      const y = 100 + radius * Math.sin(radians);
      mMarks.push(
        <circle
          key={`m-${i}`}
          cx={x}
          cy={y}
          r="0.8"
          fill="rgba(255,255,255,0.5)"
        />
      );
    }
    return { hourMarks: hMarks, minuteMarks: mMarks };
  }, []);

  return (
    <div className="relative w-full max-w-[400px] aspect-square p-4">
      <div className="absolute inset-0 bg-slate-800 rounded-full shadow-2xl border-4 border-slate-700 opacity-90 backdrop-blur-sm"></div>
      <svg viewBox="0 0 200 200" className="relative w-full h-full drop-shadow-xl">
        {/* Face Details */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        
        {/* Marks */}
        {minuteMarks}
        {hourMarks}

        {/* Hour Hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="55"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 100 100)`}
        />

        {/* Minute Hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} 100 100)`}
        />

        {/* Second Hand */}
        <line
          x1="100"
          y1="110"
          x2="100"
          y2="20"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${secondAngle} 100 100)`}
        />
        
        {/* Center Pin */}
        <circle cx="100" cy="100" r="3" fill="#ef4444" />
        <circle cx="100" cy="100" r="1.5" fill="#000" />
      </svg>
    </div>
  );
};

export default AnalogClock;