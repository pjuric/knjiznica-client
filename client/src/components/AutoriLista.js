import React from "react";
import "../styles/autor.css";
import { Link } from "react-router-dom";
import ButtonYellow from "./ButtonYellow";

export default function AutoriLista({ ime, prezime, id }) {
  return (
    <div className="autorPrikaz">
      <div className="autoriPodPrikaz">
        <p>{ime}</p>
        <p>{prezime}</p>
      </div>
      <div className="gumbi">
        <Link to={`/autor/${id}`} className="buttonYellow">
          Detalji
        </Link>
        <Link to={`/noviautor/${id}`} className="buttonYellow">
          Uredi
        </Link>
      </div>
    </div>
  );
}
