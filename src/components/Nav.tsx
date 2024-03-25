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
            <Link to="/infinitescroll">infinite Scroll</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
