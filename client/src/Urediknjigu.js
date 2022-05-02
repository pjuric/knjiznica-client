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
      coverImageName: coverImageName.replace(/^.*[\\\/]/, ''),
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
  useEffect(() => {
    const getAutori = () => axios.get(urlAutori);
    async function fetchData() {
      const [gotAutori] = await axios.all([getAutori()]);
      setAutori(gotAutori.data.autori);
      setLoading(false);
      return gotAutori;
    }
    fetchData();
  }, [urlAutori]);
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
                    <input
                      type="text"
                      name="naziv"
                      onChange={updateNaziv}
                      placeholder="Naziv"
                      className="urediKnjiguInput"
                    />
                    <input
                      type="text"
                      name="zanr"
                      onChange={updateZanr}
                      placeholder="Žanr"
                      className="urediKnjiguInput"
                    />
                    <input
                      type="date"
                      name="datum objavljivanja"
                      onChange={updateDatumObjavljivanja}
                      placeholder="Datum objavljivanja"
                      className="urediKnjiguInput"
                    />
                  </div>
                  <div className="urediKnjiguInputLayout">
                    <select name="autor" onChange={updateAutor} className="urediKnjiguInput">
                    {autori.map((autorv) => (
                      // id && autorv.id === autor ? 
                      // <option selected label={autorv.ime} value={autorv.id}></option>
                      //   :
                      <option key={autorv._id} label={autorv.ime + autorv.prezime}  value={autorv._id}></option>
                    ))}
                    </select>
                    <input
                      type="number"
                      name="kolicina"
                      onChange={updateKolicina}
                      placeholder="Količina"
                      className="urediKnjiguInput"
                    />
                    <input
                      type="number"
                      name="broj stranica"
                      onChange={updateBrojStranica}
                      placeholder="Broj stranica"
                      className="urediKnjiguInput"
                    />
                  </div>
                </div>
                <div className="urediKnjiguSecondLayout">
                  <input
                    type="file"
                    name="slika"
                    onChange={updateCoverImageName}
                  />
                  <textarea
                    name="opis"
                    onChange={updateOpis}
                    cols="3"
                    rows="3"
                    placeholder="Opis"
                  />
                </div>
                <div className="gumbi">
                  <button type="submit" className="buttonYellow">
                    Spremi
                  </button>
                  {id && (
                    <button className="buttonYellow" onClick="">
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
