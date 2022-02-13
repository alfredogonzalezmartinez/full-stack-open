import React from "react";
import ReactDOM from "react-dom";

import Header from "./Components/Header.js";
import Content from "./Components/Content.js";
import Total from "./Components/Total.js";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const contentList = [
    { title: part1, exercises: exercises1 },
    { title: part2, exercises: exercises2 },
    { title: part3, exercises: exercises3 },
  ];

  return (
    <div>
      <Header>{course}</Header>
      <Content contentList={contentList} />
      <Total contentList={contentList} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
