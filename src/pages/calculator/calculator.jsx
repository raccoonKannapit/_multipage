import "./calculator.css";

import React, { useState } from "react";

function calculator() {

    const [display, setDisplay] = useState("0");
    const [total, setTotal] = useState(0);
    const [currentNumber, setCurrentNumber] = useState([]);
    const [isCleared, setIsCleared] = useState(true);
  
    const add = (x) => {
      if (x === "0" && display === "0") {
        setDisplay("0");
      } else if (display === "0" && x !== "0") {
        setDisplay(x);
      } else {
        setDisplay(display + x);
      }
      setIsCleared(false);
    };
  
    const clearAll = () => {
      setDisplay("0");
      setTotal(0);
      setCurrentNumber([]);
      setIsCleared(true);
    };
  
    const clearVal = () => {
      setDisplay("0");
      setIsCleared(true);
    };
  
    const addOperation = (operator) => {
      setCurrentNumber([...currentNumber, Number(display), operator]);
      setDisplay("0");
    };
  
    const showTotal = () => {
      const newCurrentNumber = [...currentNumber, Number(display)];
      const totalResult = calculate(newCurrentNumber);
      setDisplay(String(totalResult));
      setTotal(totalResult);
      setCurrentNumber([]);
    };
  
    const calculate = (num) => {
      let result = num.shift();
      for (let i = 0; i < num.length; i++) {
        if (num[i] === "+") {
          result += num[i + 1];
        } else if (num[i] === "-") {
          result -= num[i + 1];
        } else if (num[i] === "*") {
          result *= num[i + 1];
        } else if (num[i] === "/") {
          result /= num[i + 1];
        }
      }
      return result;
    };


  return (
    <div className="calculator-container">
      <table align="center" border="1">
        <tbody>
          <tr>
            <td colSpan="4">
              <input type="text" id="display" value={display} disabled />
            </td>
          </tr>
          <tr>
            <td colSpan="4" align="right" bgcolor="lightgray">
              {isCleared ? (
                <button id="clrAll" className="clr button" onClick={clearAll}>
                  AC
                </button>
              ) : (
                <button id="clr" className="clr button" onClick={clearVal}>
                  C
                </button>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={() => add("7")} className="number button">
                7
              </button>
            </td>
            <td>
              <button onClick={() => add("8")} className="number button">
                8
              </button>
            </td>
            <td>
              <button onClick={() => add("9")} className="number button">
                9
              </button>
            </td>
            <td>
              <button onClick={() => addOperation("/")} className="operator button">
                /
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={() => add("4")} className="number button">
                4
              </button>
            </td>
            <td>
              <button onClick={() => add("5")} className="number button">
                5
              </button>
            </td>
            <td>
              <button onClick={() => add("6")} className="number button">
                6
              </button>
            </td>
            <td>
              <button onClick={() => addOperation("*")} className="operator button">
                *
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={() => add("1")} className="number button">
                1
              </button>
            </td>
            <td>
              <button onClick={() => add("2")} className="number button">
                2
              </button>
            </td>
            <td>
              <button onClick={() => add("3")} className="number button">
                3
              </button>
            </td>
            <td>
              <button onClick={() => addOperation("-")} className="operator button">
                -
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={() => add(".")} className="number button">
                <b>.</b>
              </button>
            </td>
            <td>
              <button onClick={() => add("0")} className="number button">
                0
              </button>
            </td>
            <td>
              <button onClick={showTotal} className="operator button">
                =
              </button>
            </td>
            <td>
              <button onClick={() => addOperation("+")} className="operator button">
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default calculator;
