import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => <>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </>
  
export default Course;
