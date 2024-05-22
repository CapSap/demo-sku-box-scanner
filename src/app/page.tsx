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

  function handleClear() {
    setUserInput("");
    document.getElementById("skus")?.focus();
  }

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
      <button id="clearInputButton" onClick={() => handleClear()}>
        Clear input
      </button>
    </div>
  );
}
