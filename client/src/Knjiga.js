import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { decodeToken } from "react-jwt";
import "./styles/knjiga.css";

export default function Knjiga() {
  const { id } = useParams();
  const [knjiga, setKnjiga] = useState();
  const [korisnikZahtjevi, setKorisnikZahtjevi] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const urlKnjiga = `http://localhost:8081/knjige/${id}`;
  const urlKorisnikZahtjevi = `http://localhost:8081/zahtjevi/korisnik/${decodeToken(localStorage.getItem("token")).id}`;
  const navigate = useNavigate();

  if (!localStorage.token) {
    navigate("/login");
  }

  useEffect(() => {
    const getKorisnikZahtjevi = () => axios.get(urlKorisnikZahtjevi);
    const getKnjige = () => axios.get(urlKnjiga);
    async function fetchData() {
      const [gotKorisnikZahtjevi, gotKnjige] = await axios.all([getKorisnikZahtjevi(), getKnjige()]);
      setKorisnikZahtjevi(gotKorisnikZahtjevi.data.zahtjevi);
      setKnjiga(gotKnjige.data.knjiga);
      setLoading(false)
      return gotKnjige;
    }
    fetchData();
    setToken(localStorage.getItem("token"));
    setUser(decodeToken(token));
  }, [urlKorisnikZahtjevi, urlKnjiga, token]);

  function handleRezerviraj(e) {
    e.preventDefault();
    const zahtjevObject = {
      korisnik: user.id,
      knjiga: id,
      korisnickoIme: user.korisnickoIme,
      knjigaNaziv: knjiga.naziv
    };
    const korisnikObject = {
      posudba: true
    };
    const qs = require("qs");
    axios
      .post("http://localhost:8081/zahtjevi", qs.stringify(zahtjevObject))
      .catch((err) => {
        console.error(err);
      });
    axios
      .put(`http://localhost:8081/korisnici/rezervacija/${user.id}`, qs.stringify(korisnikObject))
      .catch((err) => {
        console.error(err);
      });
    axios
      .put(`http://localhost:8081/knjige/rezervacija/${knjiga._id}`)
      .catch((err) => {
        console.error(err);
      });
    alert(
      "Rezervirali ste " +
        knjiga.naziv +
        ". U knjižnici možete podići vašu knjigu."
    );
    navigate("/knjige");
  }

  return (
    <div>
      {loading ? (
        "Učitavanje"
      ) : (
        <div className="">
          <h2 className="h2 mb-5 mt-3">{knjiga.naziv}</h2>
          <div className="knjgaDetaljiLayout">
            <div>
              <img src={`/knjige/${knjiga.coverImageName}`} alt="knjiga" />
              <div className="urediObrisiGumbi mt-3">
                {user.admin ? (
                  <Link
                    to={`/urediknjigu/${id}`}
                    className="btn btn-warning px-5 me-3"
                  >
                    Uredi
                  </Link>
                ) : (
                  knjiga.kolicina > 0 && user.posudba === false && korisnikZahtjevi.length < 1 &&
                  <button
                    className="btn btn-warning px-4 me-3"
                    onClick={handleRezerviraj}
                  >
                    Rezerviraj
                  </button>
                )}
                {console.log(korisnikZahtjevi)}
                <Link
                  to={`/autor/${knjiga.autor}`}
                  className="btn btn-info px-5"
                >
                  Autor
                </Link>
              </div>
            </div>
            <div className="knjigaDetaljiDesno container">
              {knjiga.zanr && (
                <div className="knjigaDetaljiAtributi">
                  <p className="naznačenTekst">Žanr</p>
                  <p className="">{knjiga.zanr}</p>
                </div>
              )}
              <div className="knjigaDetaljiAtributi">
                <p className="naznačenTekst">Količina</p>
                <p className="">{knjiga.kolicina}</p>
              </div>
              <div className="knjigaDetaljiAtributi">
                <p className="naznačenTekst">Godina objavljivanja</p>
                <p className="">{knjiga.datumObjavljivanja.slice(0, 4)}</p>
              </div>
              <div className="knjigaDetaljiAtributi">
                <p className="naznačenTekst">Broj stranica</p>
                <p className="">{knjiga.brojStranica}</p>
              </div>
              <div className="knjigaDetaljiAtributiOpis">
                <p className="naznačenTekst">Opis</p>
                <p className="">{knjiga.opis}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
