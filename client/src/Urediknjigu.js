import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/knjiga.css";

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
  const urlAutori = "http://localhost:8081/autori";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [id, urlAutori]);

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
      kolicina: kolicina,
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
      {loading
        ? "Učitavanje"
        : autori && (
            <div>
              <h2>Uredi naslov</h2>
              <form
                action="http://localhost:8081/knjige"
                method="POST"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="urediKnjiguMainLayout">
                  <div className="urediKnjiguInputLayout">
                    <div className="urediKnjiguLabelAndInput">
                      <label htmlFor="naziv">Naziv</label>
                      <input
                        type="text"
                        id="naziv"
                        name="naziv"
                        onChange={updateNaziv}
                        value={naziv}
                        className="urediKnjiguInput"
                        required
                      />
                    </div>
                    <div className="urediKnjiguLabelAndInput">
                      <label htmlFor="zanr">Žanr</label>
                      <input
                        type="text"
                        name="zanr"
                        onChange={updateZanr}
                        value={zanr}
                        className="urediKnjiguInput"
                      />
                    </div>
                    <div className="urediKnjiguLabelAndInput">
                      <label htmlFor="datum objavljivanja">
                        Datum objavljivanja
                      </label>
                      <input
                        type="date"
                        name="datum objavljivanja"
                        onChange={updateDatumObjavljivanja}
                        value={datumObjavljivanja}
                        className="urediKnjiguInput"
                      />
                    </div>
                  </div>
                  <div className="urediKnjiguInputLayout">
                    <div className="urediKnjiguLabelAndInput">
                      <label htmlFor="autor">Autor</label>
                      <select
                        name="autor"
                        onChange={updateAutor}
                        value={autor}
                        className="urediKnjiguInput"
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
                    <div className="urediKnjiguLabelAndInput">
                      <label htmlFor="kolicina">Količina</label>
                      <input
                        type="number"
                        name="kolicina"
                        onChange={updateKolicina}
                        value={kolicina}
                        className="urediKnjiguInput"
                      />
                    </div>
                    <div className="urediKnjiguLabelAndInput">
                      <label htmlFor="broj stranica">Broj stranica</label>
                      <input
                        type="number"
                        name="broj stranica"
                        onChange={updateBrojStranica}
                        value={brojStranica}
                        className="urediKnjiguInput"
                      />
                    </div>
                  </div>
                </div>
                <div className="urediKnjiguSecondLayout">
                  <label htmlFor="slika">Slika</label>
                  <input
                    type="file"
                    name="slika"
                    required
                    onChange={updateCoverImageName}
                  />
                  <label htmlFor="opis">Opis</label>
                  <textarea
                    name="opis"
                    onChange={updateOpis}
                    cols="3"
                    rows="3"
                    value={opis}
                  />
                </div>
                <div className="gumbi">
                  <button type="submit" className="buttonYellow">
                    Spremi
                  </button>
                  {id && (
                    <button className="buttonYellow" onClick={handleObrisi}>
                      Obriši
                    </button>
                  )}
                  <a href="/knjige" className="buttonYellow">
                    Prekid
                  </a>
                </div>
              </form>
            </div>
          )}
    </div>
  );
}
