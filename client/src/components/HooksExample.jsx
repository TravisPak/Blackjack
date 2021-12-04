import React, { useState, useEffect } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  // useState returns a pair: the current state value and a function that lets you update it
  // pass in the initial value

  // when count gets updated, useEffect()
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `${count} clicks`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => {setCount(count + 1); console.log(count)}}>
        Click me
      </button>
    </div>
  );
}

export default Example;