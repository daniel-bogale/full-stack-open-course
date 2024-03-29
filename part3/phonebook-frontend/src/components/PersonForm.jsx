const PersonForm = ({
  onNameChangeHandler,
  onNumberChangeHandler,
  handleAddNumber,
  nameInputValue,
  numberInputValue,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={onNameChangeHandler} value={nameInputValue} />
      </div>
      <div>
        number:{" "}
        <input onChange={onNumberChangeHandler} value={numberInputValue} />
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <button type="submit" onClick={handleAddNumber}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
