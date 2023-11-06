const Filter = ({ onFilterChangeHandler }) => {
  return (
    <div>
      filter shown with <input type="text" onChange={onFilterChangeHandler} />
    </div>
  );
};
export default Filter;
