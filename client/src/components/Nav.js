import "../styles/nav.css"

export default function Nav() {
  return (
    <div className="navMain">
      <img src="/logo.png" alt="logo"/>
      <div className="subNav">
        <a href="/">Početna</a>
        <a href="/knjige">Knjige</a>
        <a href="/autori">Autori</a>
        <a href="/korisnici">Korisnici</a>
      </div>
    </div>
  );
}
