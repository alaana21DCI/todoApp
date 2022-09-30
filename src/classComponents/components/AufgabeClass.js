import "./Aufgabe.css";
import { useState } from "react";

const AufgabeClass = ({
  number,
  text,
  farbe,
  done,
  aufgabeToggeln,
  onEdit,
  onRemove,
}) => {
  //useState:
  const [edit, setEdit] = useState(false);
  const [currentVal, setCurrentVal] = useState(text);

  const handleChange = (event) => {
    setCurrentVal(event.target.value);
  };

  // komponente von To Do items bauen
  return (
    <div className="list-Container">
      {/* Todo list-item -> wenn wir auf Edit edit-Button klicken enthält das Item ein Input-feld, wo wir den alten text editieren können   */}

      <li
        className={`Aufgabe ${farbe}`}
        id={number}
        style={{ backgroundColor: done ? "gray" : "red" }}
        // falls wir auf dam element klicken möchten:
        /*  onClick={() => {
          // props.aufgabeAlsErledigtMarkieren(number);
        }} */
      >
        {edit === false ? (
          <span> {text} </span>
        ) : (
          <input
            placeholder="Edit your task ..."
            type="text"
            name="currentValue"
            value={currentVal}
            onChange={handleChange}
          />
        )}

        <div>
          {/* Button 1 onclick -> Aufgabe erledigen */}
          <button
            onClick={() => {
              aufgabeToggeln(number);
            }}
          >
            {done === false ? "Erledigt" : "Zurücksetzen"}
          </button>

          {/* Button 2 onclick -> Aufgabe Löschen  */}

          {/* Button nur wenn die function da ist  */}
          {onRemove ? (
            <button
              onClick={() => {
                onRemove(number);
              }}
            >
              Löschen
            </button>
          ) : null}

          {/* Button 3 onclick -> Aufgabe editieren und speichern  */}
          <button
            onClick={() => {
              setEdit(!edit);
              onEdit(number, currentVal);
            }}
            style={{ backgroundColor: edit ? "green" : "yellow" }}
          >
            {edit === false ? "Edit" : "Speichern"}
          </button>
        </div>
      </li>
    </div>
  );
};

export default AufgabeClass;
