import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/offline">Offline</Link>
          </li>
          <li>
            <Link to="/websockets">Websocket</Link>
          </li>
          <li>
            <Link to="/infinitqueries">infinite Queries</Link>
          </li>
          <li>
            <Link to="/parallelSerial">Parallel/Serial </Link>
          </li>
          <li>
            <Link to="/mutations">Mutations</Link>
          </li>
          <li>
            <Link to="/batching">Batching</Link>
          </li>
          <li>
            <Link to="/forms">Forms</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
