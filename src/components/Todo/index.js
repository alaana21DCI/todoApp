import "./index.scss";
import { useState } from "react";

const Todo = ({ id, text, done, aufgabeToggeln, onEdit, onRemove }) => {
  const [edit, setEdit] = useState(false);
  const [currentVal, setCurrentVal] = useState(text);

  const handleChange = (event) => {
    setCurrentVal(event.target.value);
  };

  return (
    <div className="list-Container">
      {/* Todo list-item -> wenn wir auf Edit edit-Button klicken enthält das Item ein Input-feld, wo wir den alten text editieren können   */}
      <li
        className="Todo"
        _id={id}
        style={{
          backgroundColor: done ? "#2b095e" : "#bdfdbd",
          color: done ? "#bfddbd" : "#2b095e",
        }}
      >
        {edit === false ? (
          <span> {text} </span>
        ) : (
          <input
            placeholder="Text bearbeiten ..."
            type="text"
            name="currentValue"
            value={currentVal}
            onChange={handleChange}
          />
        )}

        <div className="actions">
          {/* Button 1 onclick -> Aufgabe erledigen */}
          <button
            onClick={() => {
              aufgabeToggeln(id);
            }}
          >
            {done === false ? "Erledigt" : "Zurücksetzen"}
          </button>

          {/* Button 2 onclick -> Aufgabe Löschen  */}
          {/* Button nur wenn die function da ist  */}
          {onRemove ? (
            <button
              onClick={() => {
                onRemove(id);
              }}
            >
              Löschen
            </button>
          ) : null}

          {/* Button 3 onclick -> Aufgabe editieren und speichern  */}
          <button
            onClick={() => {
              setEdit(!edit);
              onEdit(id, currentVal);
            }}
            style={{ backgroundColor: edit ? "#7adf50" : "orange" }}
          >
            {edit === false ? "Bearbeiten" : "Speichern"}
          </button>
        </div>
      </li>
    </div>
  );
};

export default Todo;
