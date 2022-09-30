import React from "react";

import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import "./index.scss";

const Layout = (props) => {
  const { appLayout } = useContext(ThemeContext);

  return (
    <main className={`main ${appLayout ? "hell" : "dunkel"}`}>
      <h1>Meine To Do App:</h1>
      {props.children}
    </main>
  );
};

export default Layout;
