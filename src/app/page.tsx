"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { ChangeEvent, useState } from "react";
import { newData } from "./utils/newData";
import { data } from "./types/types";
// import {data} from "./utils/csvjson"

export default function Home() {
  const [userInput, setUserInput] = useState("");

  const userArray = userInput.split(/\s/);

  function handleInputUpdate(e: ChangeEvent<HTMLTextAreaElement>) {
    if (userArray.length > 2) {
      setUserInput(e.target.value);
    } else {
      setUserInput(e.target.value);
    }
  }

  const search = (arr: data[], str: string) => {
    return arr.find((obj) => Object.values(obj).includes(str));
  };

  function isGood(input: string): boolean {
    const skuObj = search(newData, userArray[0]);

    if (!skuObj) {
      return false;
    }

    const secondSearch = search([skuObj], userArray[1]);

    return skuObj && secondSearch ? true : false;
  }

  function handleClear() {
    setUserInput("");
    document.getElementById("skus")?.focus();
  }

  console.log("ua", userArray);

  const location = newData.find((item) =>
    Object.values(item).includes(userArray[0])
  )?.box;

  console.log("loc", location);

  return (
    <div id="container">
      <textarea
        inputMode="none"
        name="skus"
        id="skus"
        value={userInput}
        onChange={(e) => {
          handleInputUpdate(e);
        }}
      ></textarea>
      <p id="message">{isGood(userInput) ? "Box is good" : "bad"}</p>
      {location ? (
        <p id="location">Product is located in box #{location}</p>
      ) : null}
      <button id="clearInputButton" onClick={() => handleClear()}>
        Clear input
      </button>
    </div>
  );
}
