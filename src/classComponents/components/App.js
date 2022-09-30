import "../css/App.scss";
import HeaderClass from "./HeaderClass";
import HelpsClass from "./HelpsClasss";
import TodoListeClass from "./TodoListeClass";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App" id="App">
        <HeaderClass />
        <Routes>
          <Route path="/todos" element={<TodoListeClass />} />
          <Route path="/helps" element={<HelpsClass />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
