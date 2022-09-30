import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [appLayout, setAppLayout] = useState(true);

  const toggleLayout = () => {
    setAppLayout(!appLayout);
  };

  return (
    <ThemeContext.Provider value={{ appLayout, toggleLayout }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
