import { Link } from "react-router-dom";

const HeaderClass = () => {
  // komponent für Header bauen

  return (
    <div className="Header">
      <h1>Meine To Do App</h1>
      <ul>
        <li>
          <Link to="/todos">Todos</Link>
        </li>
        <li>
          <Link to="/helps">Help</Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderClass;
