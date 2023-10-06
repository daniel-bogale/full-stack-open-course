import Part from "./Part";

const Content = ({ parts }) => (
  <ul>
    {parts.map((part) => (
      <li key={part.id}>
        <Part part={part} />
      </li>
    ))}
  </ul>
);

export default Content;
