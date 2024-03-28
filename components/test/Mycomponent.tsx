"use client";
// MyComponent.js
import React, { useState } from "react";

const MyComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  console.log("Component rendered !"); // This will log each time MyComponent renders

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default MyComponent;
