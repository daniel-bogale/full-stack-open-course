const Filter = ({ onFilterChangeHandler }) => {
  return (
    <div>
      Filter shown with <input type="text" onChange={onFilterChangeHandler} />
    </div>
  );
};

export default Filter;
