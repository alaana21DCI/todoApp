import Aufgabe from "./AufgabeClass";

import React, { Component } from "react";

class ToDoListeClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      neuAufgabe: "",
      aufgaben: [
        { text: "Sport machen", done: false, id: 1, farbe: "black" },
        { text: "Essen kochen", done: false, id: 2, farbe: "black" },
        { text: "React lernen", done: false, id: 3, farbe: "black" },
        { text: "Einkaufen gehen", done: false, id: 4, farbe: "black" },
        { text: "Mit katzen spielen", done: true, id: 5, farbe: "black" },
        { text: "React wiederholen", done: false, id: 6, farbe: "black" },
      ],
    };
    this.aufgabeToggeln = this.aufgabeToggeln.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCompleteAll = this.handleCompleteAll.bind(this);
    this.handleReturnAll = this.handleReturnAll.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // useEfffect hook
  //1 .wenn componente geladen wurde(sichtbar)
  componentDidMount() {
    // Daten aus dem LocalStorage holen
    let dataAlsJSON = localStorage.getItem("aufgabenLS");
    let data = JSON.parse(dataAlsJSON);
    // gib es daten?
    if (data) {
      // daten in state speichern :
      this.setState({ ...this.state, aufgaben: data });
    }
  }

  //2 .wenn sich etwas im State  ändert
  componentDidUpdate(prevProps, prevState) {
    //// Daten in dem LocalStorage speichern nach prüfen die änderun:
    if (this.state.aufgaben !== prevState.aufgaben) {
      localStorage.setItem("aufgabenLS", JSON.stringify(this.state.aufgaben));
    }
  }

  // button 1 -> function Aufgabe erledigen
  aufgabeToggeln = (id) => {
    // kopie von aufgabe,weil es Änderungen gibt,machen wir das kopie mit (map oder spread op)
    let aufgabenKopie = this.state.aufgaben.map((aufgabe) => {
      return aufgabe.id === id
        ? this.setState({ ...this.state.aufgaben, done: !aufgabe.done })
        : aufgabe;
    });
  };

  // button 2 -> function Aufgabe Löschen

  handleRemove = (id) => {
    let aufgabeKopie = this.state.aufgaben.filter(
      (aufgabe) => aufgabe.id !== id
    );
    this.setState({ ...this.state, aufgaben: aufgabeKopie });
  };

  // button -> function Alle erledigen
  handleCompleteAll = () => {
    let aufgabenKopie = this.state.aufgaben.map((aufgabe) => {
      if (aufgabe.done !== true) {
        aufgabe.done = true;
      }
      return aufgabe;
    });
    this.setState(aufgabenKopie);
  };

  // button -> function Alle zurücksetzen
  handleReturnAll = () => {
    let aufgabenKopie = this.state.aufgaben.map((aufgabe) => {
      // done von true auf false umwandeln
      if (aufgabe.done === true) {
        aufgabe.done = false;
      }
      return aufgabe;
    });
    this.setState(aufgabenKopie);
  };

  // button -> function Alle Löschen
  handleRemoveAll = () => {
    this.setState({});
  };

  // Aufgabe 5

  //function für Input-feld => der Text aus dem Input Feld ändern
  handleChange = (event) => {
    this.setState(event.target.value);
  };

  // add ein input value to ToDo-list :
  handleAdd = () => {
    this.setState([
      ...this.state,
      {
        text: this.state.neuAufgabe,
        done: false,
        id: Date.now(),
        farbe: "black",
      },
    ]);
  };

  // 6
  handleEdit = (id, neuVal) => {
    let aufgabenKopie = this.state.aufgaben.map((aufgabe) => {
      if (aufgabe.id === id) {
        aufgabe.text = neuVal;
      }
      return aufgabe;
    });
    this.setState(aufgabenKopie);
  };

  render() {
    // filter function => aussotieren:
    let nichtErledigteAufgaben = this.state.aufgaben.filter(
      (aufgabe) => !aufgabe.done
    );
    let schonErledigteAufgaben = this.state.aufgaben.filter(
      (aufgabe) => aufgabe.done
    );

    return (
      <div className="ToDoListe">
        <div className="btnsContainer">
          <button onClick={this.handleRemoveAll}>Alle löschen</button>
          <button onClick={this.handleCompleteAll}>Alle erledigenen</button>
          <button onClick={this.handleReturnAll}>Alle zurücksetzen</button>
        </div>

        <h2>Das sind die Aufgaben: </h2>
        <ul>
          {/* schritt 1: nur nicht erledigte aufgaben anzeigen*/}
          {nichtErledigteAufgaben.map((aufgabe) => {
            return (
              <Aufgabe
                key={aufgabe.id}
                number={aufgabe.id}
                text={aufgabe.text}
                farbe={aufgabe.farbe}
                done={aufgabe.done}
                //schritt 2: onklick um als erledigt zu markieren:
                aufgabeToggeln={this.aufgabeToggeln}
                //onRemove={handleRemove}
                onEdit={this.handleEdit}
              />
            );
          })}
        </ul>

        <h2>Das habe schon erledigt: </h2>
        {/* schritt 1 nur erledigte aufgaben */}
        <ul>
          {schonErledigteAufgaben.map((aufgabe) => {
            return (
              <Aufgabe
                key={aufgabe.id}
                number={aufgabe.id}
                text={aufgabe.text}
                farbe={aufgabe.farbe}
                done={aufgabe.done}
                //schritt 2: onklick um als erledigt zu markieren:
                aufgabeToggeln={this.aufgabeToggeln}
                onRemove={this.handleRemove}
                onEdit={this.handleEdit}
              />
            );
          })}
        </ul>

        <div>
          <input
            placeholder="Add neu task... "
            type="text"
            name="neuAufgabe"
            value={this.state.neuAufgabe}
            onChange={this.handleChange}
          />
          <button
            onClick={() => {
              // damit wir leere task vermeiden
              this.state.neuAufgabe ? this.handleAdd() : alert("gib text ein");
              // damit wir den input feld leer machen nachdem wir die Aufgabe ein gefügt haben
              this.setState("");
            }}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default ToDoListeClass;

// const TodoListe = () => {
//   // komponent für Header bauen
//   // komponente von To Do items bauen
//   // state mit aufgaben:

//   let aufgabenStart = [
//     { text: "Sport machen", done: false, id: 1, farbe: "black" },
//     { text: "Essen kochen", done: false, id: 2, farbe: "black" },
//     { text: "React lernen", done: false, id: 3, farbe: "black" },
//     { text: "Einkaufen gehen", done: false, id: 4, farbe: "black" },
//     { text: "Mit katzen spielen", done: true, id: 5, farbe: "black" },
//     { text: "React wiederholen", done: false, id: 6, farbe: "black" },
//   ];

//   // useState:
//   const [aufgaben, setAufgaben] = useState(aufgabenStart);

//   // useEfffect hook
//   //1 .wenn componente geladen wurde(sichtbar)
//   useEffect(() => {
//     // Daten aus dem LocalStorage holen
//     let dataAlsJSON = localStorage.getItem("aufgabenLS");
//     let data = JSON.parse(dataAlsJSON);
//     // gib es daten?
//     if (data) {
//       // daten in state speichern :
//       setAufgaben(data);
//     }
//   }, []);

//   //2 .wenn sich etwas im State  ändert
//   useEffect(() => {
//     //// Daten in dem LocalStorage speichern
//     localStorage.setItem("aufgabenLS", JSON.stringify(aufgaben));
//   }, [aufgaben]);

//   // button 1 -> function Aufgabe erledigen
//   const aufgabeToggeln = (id) => {
//     // kopie von aufgabe,weil es Änderungen gibt,machen wir das kopie mit (map oder spread op)
//     let aufgabenKopie = aufgaben.map((aufgabe) => {
//       // das element auf dem wir klicken suchen (damit wir vergleichen  das id von(parameter) und id von (aufgabe) :(if/else)bedingung erstellen):
//       // das ID soll stimmen:
//       /*  if (aufgabe.id === id) {
//         return { ...aufgabe, done: !aufgabe.done };
//       } else {
//         return aufgabe;
//       } */

//       return aufgabe.id === id ? { ...aufgabe, done: !aufgabe.done } : aufgabe;
//     });
//     //setAufgabe function  mit das kopie von orginal hier aufrufen:
//     // setAufgabe, um die neue Array in state zu speichern :
//     setAufgaben(aufgabenKopie);
//   };

//   // button 2 -> function Aufgabe Löschen
//   // Remove-Function um braucht das id auch zu stimmen :
//   const handleRemove = (id) => {
//     let aufgabeKopie = aufgaben.filter((aufgabe) => aufgabe.id !== id);
//     setAufgaben(aufgabeKopie);
//   };

//   // button -> function Alle erledigen
//   const handleCompleteAll = () => {
//     /*  let aufgabenKopie = aufgaben.map((aufgabe) => {
//       // done von false auf true umwandeln
//       if (aufgabe.done === false) {
//         aufgabe.done = true;
//       }
//       return aufgabe;
//     });
//     setAufgaben(aufgabenKopie); */
//     // refactoring :
//     let aufgabenKopie = aufgaben.map((aufgabe) => ({ ...aufgabe, done: true }));
//     setAufgaben(aufgabenKopie);
//   };

//   // button -> function Alle zurücksetzen
//   const handleReturnAll = () => {
//     let aufgabenKopie = aufgaben.map((aufgabe) => {
//       // done von true auf false umwandeln
//       if (aufgabe.done === true) {
//         aufgabe.done = false;
//       }
//       return aufgabe;
//     });
//     setAufgaben(aufgabenKopie);
//   };

//   // button -> function Alle Löschen
//   const handleRemoveAll = () => {
//     setAufgaben([]);
//   };

//   // Aufgabe 5
//   const [neuAufgabe, setNeuAufgabe] = useState("");

//   //function für Input-feld => der Text aus dem Input Feld ändern
//   const handleChange = (event) => {
//     setNeuAufgabe(event.target.value);
//   };

//   // add ein input value to ToDo-list :
//   const handleAdd = () => {
//     setAufgaben([
//       ...aufgaben,
//       {
//         text: neuAufgabe,
//         done: false,
//         id: Date.now(),
//         farbe: "black",
//       },
//     ]);
//   };

//   // 6
//   const handleEdit = (id, neuVal) => {
//     let aufgabenKopie = aufgaben.map((aufgabe) => {
//       if (aufgabe.id === id) {
//         aufgabe.text = neuVal;
//       }
//       return aufgabe;
//     });
//     setAufgaben(aufgabenKopie);
//   };

//   // filter function => aussotieren:
//   let nichtErledigteAufgaben = aufgaben.filter((aufgabe) => !aufgabe.done);
//   let schonErledigteAufgaben = aufgaben.filter((aufgabe) => aufgabe.done);

//   return (
//     <div className="ToDoListe">
//       <div className="btnsContainer">
//         <button onClick={handleRemoveAll}>Alle löschen</button>
//         <button onClick={handleCompleteAll}>Alle erledigenen</button>
//         <button onClick={handleReturnAll}>Alle zurücksetzen</button>
//       </div>

//       <h2>Das sind die Aufgaben: </h2>
//       <ul>
//         {/* schritt 1: nur nicht erledigte aufgaben anzeigen*/}
//         {nichtErledigteAufgaben.map((aufgabe) => {
//           return (
//             <Aufgabe
//               key={aufgabe.id}
//               number={aufgabe.id}
//               text={aufgabe.text}
//               farbe={aufgabe.farbe}
//               done={aufgabe.done}
//               //schritt 2: onklick um als erledigt zu markieren:
//               aufgabeToggeln={aufgabeToggeln}
//               //onRemove={handleRemove}
//               onEdit={handleEdit}
//             />
//           );
//         })}
//       </ul>

//       <h2>Das habe schon erledigt: </h2>
//       {/* schritt 1 nur erledigte aufgaben */}
//       <ul>
//         {schonErledigteAufgaben.map((aufgabe) => {
//           return (
//             <Aufgabe
//               key={aufgabe.id}
//               number={aufgabe.id}
//               text={aufgabe.text}
//               farbe={aufgabe.farbe}
//               done={aufgabe.done}
//               //schritt 2: onklick um als erledigt zu markieren:
//               aufgabeToggeln={aufgabeToggeln}
//               onRemove={handleRemove}
//               onEdit={handleEdit}
//             />
//           );
//         })}
//       </ul>

//       <div>
//         <input
//           placeholder="Add neu task... "
//           type="text"
//           name="neuAufgabe"
//           value={neuAufgabe}
//           onChange={handleChange}
//         />
//         <button
//           onClick={() => {
//             // damit wir leere task vermeiden
//             neuAufgabe ? handleAdd() : alert("gib text ein");
//             // damit wir den input feld leer machen nachdem wir die Aufgabe ein gefügt haben
//             setNeuAufgabe("");
//           }}
//         >
//           Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TodoListe;
