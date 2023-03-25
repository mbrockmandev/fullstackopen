const PersonForm = ({
  onSubmit,
  newName,
  handleChangeName,
  newNumber,
  handleChangeNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input
          value={newName}
          onChange={handleChangeName}
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={handleChangeNumber}
        />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
