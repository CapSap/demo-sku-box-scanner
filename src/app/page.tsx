"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { newData } from "./utils/newData";
// import {data} from "./utils/csvjson"

export default function Home() {
  const [userInput, setUserInput] = useState("");

  const userArray = userInput.split(/\s/);

  function handleInputUpdate(e) {
    if (userArray.length > 2) {
      setUserInput(e.target.value);
    } else {
      setUserInput(e.target.value);
    }
  }

  const search = (arr, str) => {
    return arr.find((obj) => Object.values(obj).includes(str));
  };

  function isGood(input: string): boolean {
    const skuObj = search(newData, userArray[0]);

    console.log("found", skuObj);

    if (!skuObj) {
      return false;
    }

    const secondSearch = search([skuObj], userArray[1]);

    console.log("2nd search", secondSearch);

    return skuObj && secondSearch ? true : false;
  }
  console.log(newData);

  console.log("isgood func", isGood(userInput));

  return (
    <div id="container">
      <textarea
        name="skus"
        id="skus"
        value={userInput}
        onChange={(e) => {
          handleInputUpdate(e);
        }}
      ></textarea>
      <p id="message">{isGood(userInput) ? "Box is good" : "bad"}</p>
      <button id="clearInputButton" onClick={() => setUserInput("")}>
        Clear input
      </button>
    </div>
  );
}
