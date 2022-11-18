import {Link} from "react-router-dom";

export default function Header({user, handleLogout}) {
    return  <header className="nav">
    <span>{user ? `welcome back ${user.name}` : "welcome"}</span>
    <span>
      <Link to="/">Home</Link>
    </span>
    <span>
      <Link to="/register">Register</Link>
    </span>
    <span>
      <Link to="/login">Login</Link>
    </span>
    <span>
      <button onClick={handleLogout}>Logout</button>
    </span>
    <span>
      <Link to="/my-feed">the feed</Link>
    </span>
  </header>
}
