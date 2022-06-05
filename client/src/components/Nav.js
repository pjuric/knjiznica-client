import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import "../styles/nav.css";

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = decodeToken(token);

  function deleteStorage(e) {
    e.preventDefault();
    localStorage.clear();
    navigate(`/login`);
  }

  return (
    <nav className="navbar m-5">
      {localStorage.token && (
        <div className="container">
          {/* <a className="navbar-brand" href="/">
            <img src="/logo.png" alt="logo" width="100" />
          </a> */}
          <a className="fs-5" href="/">Početna</a>
          <a className="fs-5" href="/knjige">Knjige</a>
          <a className="fs-5" href="/autori">Autori</a>
          {user.admin && <a className="fs-5" href="/korisnici">Korisnici</a>}
          <a className="fs-5" href="/zahtjevi">Zahtjevi</a>
          <button className="fs-5" onClick={deleteStorage}>Odjava</button>
        </div>
      )}
    </nav>
  );
}
