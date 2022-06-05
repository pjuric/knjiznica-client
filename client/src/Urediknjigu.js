import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { decodeToken } from "react-jwt";
import "./styles/knjiga.css";
import Home from "./Home";

export default function Urediknjigu() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [autori, setAutori] = useState();
  const [naziv, setNaziv] = useState();
  const [opis, setOpis] = useState();
  const [autor, setAutor] = useState();
  const [datumObjavljivanja, setDatumObjavljivanja] = useState();
  const [kolicina, setKolicina] = useState();
  const [brojStranica, setBrojStranica] = useState();
  const [coverImageName, setCoverImageName] = useState();
  const [zanr, setZanr] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const urlAutori = "http://localhost:8081/autori";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(decodeToken(token));
    const getAutori = () => axios.get(urlAutori);
    async function fetchData() {
      const [gotAutori] = await axios.all([getAutori()]);
      setAutori(gotAutori.data.autori);
      setLoading(false);
      return gotAutori;
    }
    fetchData();
    if (id) {
      const urlKnjiga = `http://localhost:8081/knjige/${id}`;
      const getKnjiga = () => axios.get(urlKnjiga);
      async function fetchDataS() {
        const [gotKnjiga] = await axios.all([getKnjiga()]);
        setNaziv(gotKnjiga.data.knjiga.naziv);
        setZanr(gotKnjiga.data.knjiga.zanr);
        setOpis(gotKnjiga.data.knjiga.opis);
        setAutor(gotKnjiga.data.knjiga.autor);
        setDatumObjavljivanja(gotKnjiga.data.knjiga.datumObjavljivanja);
        setKolicina(gotKnjiga.data.knjiga.kolicina);
        setBrojStranica(gotKnjiga.data.knjiga.brojStranica);
        setCoverImageName(gotKnjiga.data.knjiga.coverImageName);
        setLoading(false);
        return gotKnjiga;
      }
      fetchDataS();
    } else {
      setLoading(false);
    }
  }, [id, urlAutori, token]);

  const updateNaziv = (e) => {
    setNaziv(e.target.value);
  };
  const updateOpis = (e) => {
    setOpis(e.target.value);
  };
  const updateAutor = (e) => {
    setAutor(e.target.value);
  };
  const updateDatumObjavljivanja = (e) => {
    setDatumObjavljivanja(e.target.value);
  };
  const updateKolicina = (e) => {
    setKolicina(e.target.value);
  };
  const updateCoverImageName = (e) => {
    setCoverImageName(e.target.value);
  };
  const updateBrojStranica = (e) => {
    setBrojStranica(e.target.value);
  };
  const updateZanr = (e) => {
    setZanr(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    const knjigaObject = {
      naziv: naziv,
      opis: opis,
      autor: autor,
      datumObjavljivanja: datumObjavljivanja,
      kolicina: kolicina, // eslint-disable-next-line
      coverImageName: coverImageName.replace(/^.*[\\\/]/, ""),
      brojStranica: brojStranica,
      zanr: zanr,
    };
    const qs = require("qs");
    if (id) {
      axios
        .put(`http://localhost:8081/knjige/${id}`, qs.stringify(knjigaObject))
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post("http://localhost:8081/knjige", qs.stringify(knjigaObject))
        .catch((err) => {
          console.error(err);
        });
    }
    navigate("/knjige");
  }
  function handleObrisi() {
    axios.delete(`http://localhost:8081/knjige/${id}`).catch((err) => {
      console.error(err);
    });
    navigate("/knjige");
  }
  return (
    <div>
      {loading ? (
        "Učitavanje"
      ) : !user?.admin ? (
        <Home />
      ) : (
        autori &&
        user.admin && (
          <div>
            {id ? (
              <h2 className="h2 my-5">
                Uredi naslov {naziv && <i>{naziv}</i>}
              </h2>
            ) : (
              <h2 className="h2 my-5">Dodaj novi naslov</h2>
            )}
            <form
              action="http://localhost:8081/knjige"
              method="POST"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Naslov
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  id="naziv"
                  name="naziv"
                  onChange={updateNaziv}
                  value={naziv}
                  required
                />
                <span className="input-group-text ms-5" id="basic-addon1">
                  Autor
                </span>
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  name="autor"
                  onChange={updateAutor}
                  value={autor}
                  required
                >
                  {autori.map((autorv) =>
                    id && autorv.id === autor ? (
                      <option
                        selected
                        label={autorv.ime}
                        value={autorv.id}
                      ></option>
                    ) : (
                      <option
                        key={autorv._id}
                        label={autorv.ime + autorv.prezime}
                        value={autorv._id}
                      ></option>
                    )
                  )}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Žanr
                </span>
                <input
                  type="text"
                  name="zanr"
                  onChange={updateZanr}
                  value={zanr}
                  className="form-control"
                  placeholder="Žanr"
                  aria-label="Žanr"
                  aria-describedby="basic-addon1"
                  id="zanr"
                />
                <span className="input-group-text ms-5 end" id="basic-addon1">
                  Količina
                </span>
                <input
                  type="number"
                  name="kolicina"
                  onChange={updateKolicina}
                  value={kolicina}
                  className="form-control"
                  placeholder="Količina"
                  aria-label="Kolicina"
                  aria-describedby="basic-addon1"
                  id="kolicina"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Broj stranica
                </span>
                <input
                  type="number"
                  name="broj stranica"
                  required
                  onChange={updateBrojStranica}
                  value={brojStranica}
                  className="form-control"
                  placeholder="Broj stranica"
                  aria-label="Broj stranica"
                  aria-describedby="basic-addon1"
                  id="brojStranica"
                />
                <label className="input-group-text ms-5" htmlFor="inputGroupFile04">
                  Slika
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Učitaj"
                  name="slika"
                  required
                  onChange={updateCoverImageName}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Datum objavljivanja
                </span>
                <input
                  type="date"
                  name="datum objavljivanja"
                  onChange={updateDatumObjavljivanja}
                  value={datumObjavljivanja}
                  className="form-control"
                  placeholder="Datum objavljivanja"
                  aria-label="Datum objavljivanja"
                  aria-describedby="basic-addon1"
                  id="datumObjavljivanja"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Opis</span>
                <textarea
                  className="form-control"
                  aria-label="Opis"
                  name="opis"
                  onChange={updateOpis}
                  cols="3"
                  rows="3"
                  value={opis}
                ></textarea>
              </div>
              <div className="gumbi">
                <button type="submit" className="btn btn-warning px-4 me-3">
                  Spremi
                </button>
                {id && (
                  <button className="btn btn-danger px-4 me-3" onClick={handleObrisi}>
                    Obriši
                  </button>
                )}
                <a href="/knjige" className="btn btn-secondary px-4">
                  Prekid
                </a>
              </div>
            </form>

            
          </div>
        )
      )}
    </div>
  );
}
