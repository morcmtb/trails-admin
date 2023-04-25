import { useEffect, useState } from "react";
import logo from "./trailbot.png";
import "./App.css";

function App() {
  // countdown timer for redirect
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        window.location.href = "https://trailbot.com/manager";
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Trail admin has moved to</p>
        <a
          className="App-link"
          href="https://trailbot.com/manager"
          target="_blank"
          rel="noopener noreferrer"
        >
          TrailBot Manager
        </a>
        <p>
          <small>
            If you need acess to Trailbot, please react out to the board or dirt
            bosses
          </small>
        </p>
        <p>
          <small>Redirecting in {countdown} seconds</small>
        </p>
      </header>
    </div>
  );
}

export default App;
