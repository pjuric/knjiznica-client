import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Knjiga from "./components/Knjiga";
import "./styles/knjiga.css";

export default function Autor() {
  const { id } = useParams();
  const [autor, setAutor] = useState();
  const [knjige, setKnjige] = useState();
  const [loading, setLoading] = useState(true);
  const urlAutor = `http://localhost:8081/autori/${id}`;
  const navigate = useNavigate();

  if (!localStorage.token) {
    navigate("/login");
  }

  useEffect(() => {
    const getAutor = () => axios.get(urlAutor);
    async function fetchData() {
      const [gotAutori] = await axios.all([getAutor()]);
      setAutor(gotAutori.data.autor);
      setKnjige(gotAutori.data.knjige);
      setLoading(false);
      return gotAutori;
    }
    fetchData();
  }, [urlAutor]);
  return (
    <div>
      {loading ? (
        "Učitavanje"
      ) : !autor ? (
        <h1>404</h1>
      ) : (
        <div>
          <h2>
            {autor.ime} {autor.prezime}
          </h2>
          <div className="autorAtributi">
            <p>{autor.biografija}</p>
          </div>
          <div>
            {knjige.length > 0 && (
              <div>
                <h2>Autorska djela</h2>
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
        </div>
      )}
    </div>
  );
}
