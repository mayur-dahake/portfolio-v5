import { useState, useEffect } from "react";

export default function TypingText({
  text,
  delay = 0,
  speed = 45,
  className = ""
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started || !text) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span className="inline-block w-[2px] h-[1em] bg-[#ff0080] ml-0.5 align-middle animate-pulse" />
      )}
    </span>
  );
}
