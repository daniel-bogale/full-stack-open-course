const PersonForm = ({
  onNameChangeHandler,
  onNumberChangeHandler,
  handleAddNumber,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={onNameChangeHandler} />
      </div>
      <div>
        number: <input onChange={onNumberChangeHandler} />
      </div>
      <div>
        <button type="submit" onClick={handleAddNumber}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
