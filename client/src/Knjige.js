import React, { useEffect, useState } from "react";
import Knjiga from "./components/Knjiga";
import "./styles/knjiga.css";
import "./styles/autor.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { decodeToken } from "react-jwt";

export default function Knjige() {
  const navigate = useNavigate();
  if (!localStorage.token) {
    navigate("login");
  }

  const { naziv } = useParams();
  const [knjige, setKnjige] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [pretraga, setPretraga] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let urlKnjige = "";
    if (naziv) {
      urlKnjige = `http://localhost:8081/knjige/pretraga/${naziv}`;
    } else {
      urlKnjige = "http://localhost:8081/knjige";
    }
    const getKnjige = () => axios.get(urlKnjige);
    async function fetchData() {
      const [gotKnjige] = await axios.all([getKnjige()]);
      setKnjige(gotKnjige.data.knjige);
      setLoading(false);
      return gotKnjige;
    }
    fetchData();
    setToken(localStorage.getItem("token"));
    setUser(decodeToken(token));
  }, [naziv, token]);

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
          <h2 className="h2 border-bottom pb-2">Pretraži</h2>
          <i>Ukupno {knjige.length} naslova</i>
          <br />
          <br />
          {naziv && knjige.length < 1 && <h2>Nema raspoloživih naslova</h2>}
          <form className="" onSubmit={handleSubmit} method="GET">
            <div className="input-group mb-3 w-50">
              <input
                type="text"
                name="naziv"
                onChange={updateNaziv}
                placeholder="Naziv"
                className="form-control"
                aria-label="Naslov"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-info"
                type="submit"
                id="button-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search m-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
                Pretraži
              </button>
            </div>
            <div className="gumbi">
              {user.admin === true && (
                <a href="/urediknjigu" className="btn btn-success">
                  Novi naslov
                </a>
              )}
            </div>
          </form>

          <div className="row">
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
