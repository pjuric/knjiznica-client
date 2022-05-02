import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AutoriLista from "./components/AutoriLista";
import "./styles/autor.css";

const Autori = () => {
  const [autori, setAutori] = useState();
  // const [pretraga, setPretraga] = useState();
  const [loading, setLoading] = useState(true);

  const urlAutori = "http://localhost:8081/autori";

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
    <div className="seasonContainer">
      {loading
        ? "Učitavanje"
        : autori && (
            <div>
              <h2>Autori</h2>
              <form action="http:localhost:8081/autori" method="GET">
                {/* <div className="podImePrezime">
                  <label>Ime</label>
                  <input
                    type="text"
                    name="ime"
                    value={pretraga}
                    className="autorInput"
                  />
                </div> */}
                <div className="autoriGumbi">
                  {/* <button type="submit" className="buttonYellow">Pretraži</button> */}
                  <Link to="/noviautor" className="buttonYellow">
                    Novi autor
                  </Link>
                </div>
              </form>
              {autori.map((autor) => (
                <AutoriLista
                  key={autor._id}
                  ime={autor.ime}
                  prezime={autor.prezime}
                  id={autor._id}
                />
              ))}
            </div>
          )}
    </div>
  );
};

export default Autori;

