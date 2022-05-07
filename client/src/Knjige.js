import React, { useEffect, useState } from "react";
import Knjiga from "./components/Knjiga";
import "./styles/knjiga.css";
import "./styles/autor.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Knjige() {
  const { naziv } = useParams();
  const navigate = useNavigate();
  const [knjige, setKnjige] = useState();
  const [pretraga, setPretraga] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let urlKnjige = "";
    if(naziv){
      urlKnjige = `http://localhost:8081/knjige/pretraga/${naziv}`
    }else{
      urlKnjige = "http://localhost:8081/knjige"
    }
    const getKnjige = () => axios.get(urlKnjige);
    async function fetchData() {
      const [gotKnjige] = await axios.all([getKnjige()]);
      setKnjige(gotKnjige.data.knjige);
      setLoading(false);
      return gotKnjige;
    }
    fetchData();
  },[naziv]);

  const updateNaziv = (e) => {
    setPretraga(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/knjige/${pretraga}`);
  }
  
  return (
    <div>
      {loading ? (
        "Učitavanje"
      ) : (
        <div>
          <h2>Pretraži</h2>
          <i>Ukupno {knjige.length} naslova</i>
          <br />
          <br />
          {naziv && knjige.length<1 && <h2>Nema raspoloživih naslova</h2>}
          <form onSubmit={handleSubmit} method="GET">
            <input
              type="text"
              name="naziv"
              onChange={updateNaziv}
              placeholder="Naziv"
              className="knjigeInputPretraga"
            />
            <div className="gumbi">
              <button type="submit" className="buttonYellow">
                Pretraži
              </button>
              <a href="/urediknjigu" className="buttonYellow">
                Novi naslov
              </a>
            </div>
          </form>

          <div className="homeKnjigeLayout">
            {knjige.map((knjiga) => (
              <Knjiga
                key={knjiga._id}
                coverImageName={knjiga.coverImageName}
                id={knjiga._id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
