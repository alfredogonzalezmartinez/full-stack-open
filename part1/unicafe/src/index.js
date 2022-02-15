import React, { useState } from "react";
import ReactDOM from "react-dom";

import Button from "./Components/Button.js";
import Statistics from "./Components/Statistics.js";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = { good, neutral, bad };

  const addGood = () => setGood((value) => value + 1);
  const addNeutral = () => setNeutral((value) => value + 1);
  const addBad = () => setBad((value) => value + 1);

  return (
    <>
      <div>
        <h2>give feedback</h2>
        <Button text="good" click={addGood} />
        <Button text="neutral" click={addNeutral} />
        <Button text="bad" click={addBad} />
      </div>
      <Statistics feedback={feedback} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
