import React, { useEffect, useState } from "react";
import Knjiga from "./components/Knjiga";
import "./styles/knjiga.css";
import "./styles/autor.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [knjige, setKnjige] = useState();
  const [loading, setLoading] = useState(true);
  const urlKnjige = "http://localhost:8081/knjige";
  const navigate = useNavigate();

  if(!localStorage.token){
    navigate("login")
  }

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
              <h2 className="mb-5 mt-5 h2 pb-2 mb-4 border-bottom border-info">Najnoviji naslovi</h2>
              <div className="row">
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