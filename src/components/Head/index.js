import "./index.scss";
import { Link } from "react-router-dom";

import ThemeButton from "../../contexts/ThemeButton";
const Header = () => {
  return (
    <header className="Header">
      <nav className="header-nav">
        <ul>
          <li>
            <Link className="link" to="/">
              Start Seite
            </Link>
          </li>
          <li>
            <Link className="link" to="/todos">
              Todos
            </Link>
          </li>
          <li>
            <Link className="link" to="/help">
              Help
            </Link>
          </li>
          <ThemeButton />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
