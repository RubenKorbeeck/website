"use client";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string; // Expecting ISO date format: "YYYY-MM-DDTHH:mm:ss"
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  },);

  if (!timeLeft) {
    return <div className="text-red-500 text-xl">🎉 Countdown Over!</div>;
  }

  return (
    <div className="flex space-x-4 text-xl font-bold">
      <div>{timeLeft.days}d</div>
      <div>{timeLeft.hours}h</div>
      <div>{timeLeft.minutes}m</div>
      <div>{timeLeft.seconds}s</div>
    </div>
  );
};

// Get target date for 24th August 2025
const getTargetDate = () => {
  const targetDate = new Date("2025-08-24T00:00:00"); // Fixed target date
  return targetDate.toISOString(); // Return it as an ISO string
};

export default function CarReveal() {
  return <CountdownTimer targetDate={getTargetDate()} />;
}
