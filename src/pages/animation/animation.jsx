import { useState, useRef, useEffect } from "react";
import './animation.css'

function animation() {

    // State variables
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [running, setRunning] = useState(false);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const ballRef = useRef(null);

  // Constants
  const fieldWidth = 800;
  const fieldHeight = 500;
  const ballSize = 100;
  const maxLeft = fieldWidth - ballSize - 2;
  const maxTop = fieldHeight - ballSize - 2;
  const vx = 5;
  const vy = 5;

  // Toggle Running
  const runClick = () => {
    setRunning((prevRunning) => !prevRunning);
  };

  // Random rotation speed and direction
  const randomSpeed = () => {
    const speed = Math.random() * (5 - 1) + 1; // random speed between 1 and 5
    const direction = Math.random() > 0.5 ? 1 : -1; // random direction
    return speed * direction;
  };

  // Calculate new position and rotation
  const calculate = () => {
    let newX = x;
    let newY = y;
    let newGoRight = goRight;
    let newGoDown = goDown;

    if (goRight) {
      newX += vx;
      if (newX >= maxLeft) {
        newGoRight = false;
        setRotationSpeed(randomSpeed());
      }
    } else {
      newX -= vx;
      if (newX <= 0) {
        newGoRight = true;
        setRotationSpeed(randomSpeed());
      }
    }

    if (goDown) {
      newY += vy;
      if (newY >= maxTop) {
        newGoDown = false;
        setRotationSpeed(randomSpeed());
      }
    } else {
      newY -= vy;
      if (newY <= 0) {
        newGoDown = true;
        setRotationSpeed(randomSpeed());
      }
    }

    setX(newX);
    setY(newY);
    setGoRight(newGoRight);
    setGoDown(newGoDown);
  };

  // Render updates the ball position and rotation
  const render = () => {
    if (ballRef.current) {
      ballRef.current.style.left = `${x}px`;
      ballRef.current.style.top = `${y}px`;
      setRotationAngle((prevAngle) => prevAngle + rotationSpeed);
      ballRef.current.style.transform = `rotate(${rotationAngle}deg)`;
    }
  };

  // Display different images
  const displayAs = (img) => {
    if (ballRef.current) {
        console.log(img)
      if (img === 0) {
        ballRef.current.style.backgroundImage = "none";
        ballRef.current.style.backgroundColor = "lightblue";
      } else {
        ballRef.current.style.backgroundImage = `url(/img/${img}.jpg)`;
        ballRef.current.style.backgroundColor = "white";
      }
    }
  };

  // UseEffect to handle the animation and field initialization
  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        calculate();
        render();
      }
    }, 25); // 40 fps (25ms)

    return () => clearInterval(interval);
  }, [x, y, rotationAngle, running]); // Dependencies for re-render

    return ( 
        <div id="container">
      <div id="field" style={{ width: fieldWidth, height: fieldHeight, position: 'relative' }}>
        <div
          id="ball"
          ref={ballRef}
          style={{
            width: ballSize,
            height: ballSize,
            position: "absolute",
            backgroundColor: "lightblue",
            left: `${x}px`,
            top: `${y}px`,
          }}
        ></div>
      </div>
      <div id="controler">
        <button className={"btn " + (running ? "btn-warning" : "btn-success")} id="run" onClick={runClick}>
          {running ? (
            <span>
              <i className="bi bi-pause-fill"></i>&nbsp;PAUSE
            </span>
          ) : (
            <span>
              <i className="bi bi-play"></i>&nbsp;RUN
            </span>
          )}
        </button>
        <button className="btn btn-primary" onClick={() => displayAs(0)}>
          NONE
        </button>
        <button
          className="btn btn-primary"
          onClick={() => displayAs("basketball")}
        >
          BASKETBALL
        </button>
        <button
          className="btn btn-primary"
          onClick={() => displayAs("football")}
        >
          FOOTBALL
        </button>
        <button
          className="btn btn-primary"
          onClick={() => displayAs("volleyball")}
        >
          VOLLEYBALL
        </button>
        <button className="btn btn-primary" onClick={() => displayAs("human")}>
          HUMAN
        </button>
        <button
          className="btn btn-primary"
          onClick={() => displayAs("cartoon")}
        >
          CARTOON
        </button>
        <button
          className="btn btn-primary"
          onClick={() => displayAs("minawan")}
        >
          LOGO
        </button>
      </div>
    </div>
     );
}

export default animation;