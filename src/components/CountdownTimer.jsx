
import { useState, useEffect } from 'react';

const CountdownTimer = ({ endTime, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(endTime);
      const difference = end - now;

      if (difference <= 0) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onComplete]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  if (isComplete) {
    return (
      <div className="text-destructive font-medium">
        Auction Ended
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 font-mono">
      <div className="flex flex-col items-center">
        <span className="text-xl font-semibold">{formatTime(timeLeft.days)}</span>
        <span className="text-xs text-muted-foreground">days</span>
      </div>
      <span className="text-xl">:</span>
      <div className="flex flex-col items-center">
        <span className="text-xl font-semibold">{formatTime(timeLeft.hours)}</span>
        <span className="text-xs text-muted-foreground">hrs</span>
      </div>
      <span className="text-xl">:</span>
      <div className="flex flex-col items-center">
        <span className="text-xl font-semibold">{formatTime(timeLeft.minutes)}</span>
        <span className="text-xs text-muted-foreground">min</span>
      </div>
      <span className="text-xl">:</span>
      <div className="flex flex-col items-center">
        <span className="text-xl font-semibold animate-pulse-soft">{formatTime(timeLeft.seconds)}</span>
        <span className="text-xs text-muted-foreground">sec</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
