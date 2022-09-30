import "../../css/App.scss";

import Head from "../Head";
import Startseite from "../StartSeite";
import Todos from "../Todos";
import Help from "../Help";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeContextProvider from "../../contexts/ThemeContext";

function App() {
  return (
    <Router>
      <div className="App" id="App">
        <ThemeContextProvider>
          <Head />
          <Routes>
            <Route path="/" element={<Startseite />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </ThemeContextProvider>
      </div>
    </Router>
  );
}

export default App;
