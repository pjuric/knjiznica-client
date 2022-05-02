import React, { useEffect, useState } from "react";
import Knjiga from "./components/Knjiga";
import "./styles/knjiga.css";
import "./styles/autor.css";
import axios from "axios";

export default function Home() {
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
              
              <h2>Najnoviji naslovi</h2>
              <div className="homeKnjigeLayout">
                {knjige.slice(0, 10).map((knjiga) => (
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