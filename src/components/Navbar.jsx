import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: 10 }}>
      <Link to="/">Home</Link> |
      <Link to="/about" style={{ marginLeft: 5 }}>
        About
      </Link>
    </nav>
  );
}

export default Navbar;
