import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/zahtjevi.css";

export default function Zahtjev({
  id,
  pocetak,
  kraj,
  podignuta,
  vracena,
  korisnickoIme,
  knjigaNaziv,
  user,
  rezervirana,
  korisnikId,
  knjigaId
}) {
  const [bgColor, setBgColor] = useState();
  const [kasnjenje, setKasnjenje] = useState();

  function handlePodizanje(e) {
    e.preventDefault();
    axios.put(`http://localhost:8081/zahtjevi/podizanje/${id}`).catch((err) => {
      console.error(err);
    });
    alert("Knjiga uspješno podignuta od strane korisnika!");
    window.location.reload(false);
  }
  function handlePonisti(e) {
    e.preventDefault();
    const qs = require("qs");
    axios.put(`http://localhost:8081/knjige/vracanje/${knjigaId}`).catch((err) => {
      console.error(err);
    });
    const korisnikObject = {
      posudba: false
    };
    axios
      .put(`http://localhost:8081/korisnici/rezervacija/${korisnikId}`, qs.stringify(korisnikObject))
      .catch((err) => {
        console.error(err);
      });
      axios
      .delete(`http://localhost:8081/zahtjevi/${id}`)
      .catch((err) => {
        console.error(err);
      });
    alert("Zahtjev poništen");
    window.location.reload(false);
  }
  function handleVracanje(e) {
    e.preventDefault();
    const qs = require("qs");
    if (kasnjenje > 0) alert("Zakašnjelo vraćanje od " + kasnjenje + " dana");
    axios.put(`http://localhost:8081/zahtjevi/vracanje/${id}`).catch((err) => {
      console.error(err);
    });
    axios.put(`http://localhost:8081/knjige/vracanje/${knjigaId}`).catch((err) => {
      console.error(err);
    });
    const korisnikObject = {
      posudba: false
    };
    axios
      .put(`http://localhost:8081/korisnici/rezervacija/${korisnikId}`, qs.stringify(korisnikObject))
      .catch((err) => {
        console.error(err);
      });
    window.location.reload(false);
  }
  useEffect(() => {
    if (rezervirana && !podignuta) {
      setBgColor(
        "bg-warning border border-dark p-3 mb-3 zahtjevprikaz d-flex justify-content-between"
      );
    } else if (rezervirana && podignuta && !vracena) {
      setBgColor(
        "bg-success border border-dark p-3 mb-3 zahtjevprikaz d-flex justify-content-between"
      );
    } else {
      setBgColor(
        "bg-secondary border border-dark p-3 mb-3 zahtjevprikaz d-flex justify-content-between"
      );
    }
    const date = kraj.slice(0, 2);
    const month = kraj.slice(4, 6);
    const year = kraj.slice(8, 12);
    const newDate = `${year}-${month}-${date}`;
    const date1 = new Date(newDate);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (date1.getTime() < date2.getTime()) setKasnjenje(diffDays);
    else setKasnjenje(0);
  }, [podignuta, rezervirana, kraj, vracena]);

  return (
    <div className={bgColor}>
      <div className="d-flex flex-column">
        
        <p>
          <b>NASLOV</b>
        </p>
        <p>{knjigaNaziv}</p>
      </div>
      {user ? (
        <div className="d-flex flex-column">
          <p>
            <b>KORISNIK</b>
          </p>
          <p>{korisnickoIme}</p>
        </div>
      ) : (
        <div>
          <p>
            <b>STANJE</b>
          </p>
          {rezervirana && !podignuta ? (
            <p>Podignite knjigu u knjižnici</p>
          ) : podignuta && !vracena ? (
            <p>Aktivno - podignuli ste knjigu</p>
          ) : (
            <p>Knjiga vraćena</p>
          )}
        </div>
      )}
      <div className="d-flex flex-column">
        <p>
          <b>DATUM REZERVACIJE</b>
        </p>
        <p>{pocetak}</p>
      </div>
      {user ? (
        <div className="d-flex flex-column">
          {!podignuta && rezervirana ? (
            <button
              onClick={handlePodizanje}
              type="button"
              className="btn btn-primary"
            >
              Podizanje
            </button>
          ) : podignuta && rezervirana && !vracena ? (
            <button
              onClick={handleVracanje}
              type="button"
              className="btn btn-primary"
            >
              Vraćanje
            </button>
          ) : (
            "završeno"
          )}
        </div>
      ) : (
        !podignuta && !vracena &&
        rezervirana && (
          <div className="d-flex flex-column">
            <button
              onClick={handlePonisti}
              type="button"
              className="btn btn-primary"
            >
              Poništi rezervaciju
            </button>
          </div>
        )
      )}
    </div>
  );
}
