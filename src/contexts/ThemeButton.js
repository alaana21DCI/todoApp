import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import "./index.scss";
const ThemeButton = () => {
  const { toggleLayout } = useContext(ThemeContext);
  return (
    <button onClick={toggleLayout} className="toggle-btn">
      Theme ändern
    </button>
  );
};

export default ThemeButton;
