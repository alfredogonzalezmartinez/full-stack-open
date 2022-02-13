import Part from "./Part.js";

const Content = ({ contentList }) => (
  <div>
    {contentList.map(({ title, exercises }) => (
      <Part>
        {title} {exercises}
      </Part>
    ))}
  </div>
);

export default Content;
