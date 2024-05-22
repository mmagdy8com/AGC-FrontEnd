import React, { useState } from "react";
import Card from "./shared/cards";
import Banner from "./shared/Subbanner";

const Giftcard = () => {
  const [sharedValue, setSharedValue] = useState("");

  const updateSharedValue = (newValue) => {
    setSharedValue(newValue);
  };
  return (
    <main>
      <Banner updateSharedValue={updateSharedValue} />
      <Card sharedValue={sharedValue} />
    </main>
  );
};

export default Giftcard;
