import "./index.scss";

import Layout from "../../Layout";
import Todo from "../Todo";

import { useEffect, useState } from "react";

const Todos = () => {
  let initialState = [
    { text: "Sport machen", done: false, _id: 1 },
    { text: "Essen kochen", done: false, _id: 2 },
    { text: "React lernen", done: false, _id: 3 },
  ];

  const [todos, setTodos] = useState(initialState);

  useEffect(() => {
    let dataAlsJSON = localStorage.getItem("todosLS");
    let data = JSON.parse(dataAlsJSON);
    if (data) {
      setTodos(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todosLS", JSON.stringify(todos));
  }, [todos]);

  // button 1 -->  Ein Aufgabe erledigen (_id):
  const aufgabeToggeln = (id) => {
    let todosCopy = todos.map((todo) => {
      return todo._id === id ? { ...todo, done: !todo.done } : todo;
    });
    setTodos(todosCopy);
  };

  // button 2 --> Ein Aufgabe Löschen (_id):
  const handleRemove = (id) => {
    let todosCopy = todos.filter((todo) => todo._id !== id);
    setTodos(todosCopy);
  };

  // button 3 -->  Alle Erledigen :
  const handleCompleteAll = () => {
    let todosCopy = todos.map((todo) => ({ ...todo, done: true }));
    setTodos(todosCopy);
  };

  // button 4 -->  Alle Zurücksetzen :
  const handleReturnAll = () => {
    let todosCopy = todos.map((todo) => {
      if (todo.done === true) {
        todo.done = false;
      }
      return todo;
    });
    setTodos(todosCopy);
  };

  // button 5 -->  Alle Löschen :
  const handleRemoveAll = () => {
    setTodos([]);
  };

  // ADD NEW TODO :
  const [newTask, setNewTask] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAdd = () => {
    setTodos([
      ...todos,
      {
        text: newTask,
        done: false,
        _id: Date.now(),
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // EDIT TODO FIELD :
  const handleEdit = (id, neuVal) => {
    let todosCopy = todos.map((todo) => {
      if (todo._id === id) {
        todo.text = neuVal;
      }
      return todo;
    });
    setTodos(todosCopy);
  };

  let toDoList = todos.filter((todo) => !todo.done);
  let doneList = todos.filter((todo) => todo.done);

  return (
    <Layout>
      <div className="wrapper">
        <section className="fillter-box">
          <button onClick={handleRemoveAll} className="btn">
            Alle löschen
          </button>
          <button className="btn" onClick={handleCompleteAll}>
            Alle erledigenen
          </button>
          <button className="btn" onClick={handleReturnAll}>
            Alle zurücksetzen
          </button>
        </section>

        <section className="allTodos-box">
          <h2>Das sind die Aufgaben:</h2>
          <ul>
            {/* schritt 1: nur nicht erledigte aufgaben anzeigen*/}
            {toDoList.map((todo) => {
              return (
                <Todo
                  key={todo._id}
                  id={todo._id}
                  text={todo.text}
                  done={todo.done}
                  //schritt 2: onklick um als erledigt zu markieren:
                  aufgabeToggeln={aufgabeToggeln}
                  onEdit={handleEdit}
                />
              );
            })}
          </ul>
        </section>

        <section className="doneTodos-box">
          <h2>Das habe schon erledigt: </h2>
          {/* schritt 1 nur erledigte aufgaben */}
          <ul>
            {doneList.map((todo) => {
              return (
                <Todo
                  key={todo._id}
                  id={todo._id}
                  text={todo.text}
                  done={todo.done}
                  //schritt 2: onklick um als erledigt zu markieren:
                  aufgabeToggeln={aufgabeToggeln}
                  //schritt 3: onklick um erledigte Aufgabe zu entfernen:
                  onRemove={handleRemove}
                  onEdit={handleEdit}
                />
              );
            })}
          </ul>
        </section>

        <section className="addNewTodo-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="">Neue Aufgabe erstellen :</label>
            <input
              placeholder="erstelle eine neue Aufgabe... "
              type="text"
              name="neuAufgabe"
              value={newTask}
              onChange={handleChange}
            />
            <button
              className="btn"
              onClick={() => {
                newTask ? handleAdd() : alert("gib dein text ein");
                setNewTask("");
              }}
            >
              Add
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default Todos;
