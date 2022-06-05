import React from "react";
import "../styles/autor.css";
import { Link } from "react-router-dom";

export default function AutoriLista({ ime, prezime, id, korisnik, admin }) {
  return (
    <div className="autorPrikaz">
      <div className="autoriPodPrikaz">
        <p>{ime}</p>
        <p>{prezime}</p>
      </div>
      <div className="gumbi">
        <Link to={!korisnik ? `/autor/${id}` : `/korisnik/${id}`} className="btn btn-info px-5 my-2">
          Detalji
        </Link>
        {!korisnik && admin && (
          <Link to={`/noviautor/${id}`} className="btn btn-warning px-5 my-2 ms-3">
            Uredi
          </Link>
        )}
      </div>
    </div>
  );
}
