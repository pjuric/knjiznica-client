import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Knjiga from "./components/Knjiga";
import "./styles/knjiga.css";

export default function Autor() {
  const { id } = useParams();
  const [autor, setAutor] = useState();
  const [loading, setLoading] = useState(true);
  const urlAutor = `http://localhost:8081/autori/${id}`;

  useEffect(() => {
    const getAutor = () => axios.get(urlAutor);
    async function fetchData() {
      const [gotAutori] = await axios.all([getAutor()]);
      setAutor(gotAutori.data.autor);
      setLoading(false);
      return gotAutori;
    }
    fetchData();
  }, [urlAutor]);
  return (
    <div>
      {loading ? (
        "Učitavanje"
      ) : (
        <div>
          <h2>
            {autor.ime} {autor.prezime}
          </h2>
          <div className="autorAtributi">
            <p>{autor.biografija}</p>
          </div>
          <div>
            <h2>Autorska djela</h2>
            <div className="homeKnjigeLayout">
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
