import React, { useEffect, useState } from "react";
import Knjiga from "./components/Knjiga";
import "./styles/knjiga.css";
import "./styles/autor.css";
import axios from "axios";

export default function Knjige() {
  const [knjige, setKnjige] = useState();
  const [loading, setLoading] = useState(true);
  const urlKnjige = "http://localhost:8081/knjige";

  useEffect(() => {
    const getKnjige = () => axios.get(urlKnjige);
    async function fetchData() {
      const [gotKnjige] = await axios.all([getKnjige()]);
      setKnjige(gotKnjige.data.knjige);
      setLoading(false);
      return gotKnjige;
    }
    fetchData();
  }, [urlKnjige]);
  return (
    <div>
      {loading
        ? "Učitavanje"
        : (
            <div>
              
              <h2>Pretraži</h2>
              <input
                type="text"
                name="naziv"
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
