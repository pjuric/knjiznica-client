import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles/autor.css";
import AutoriLista from "./components/AutoriLista";

const Korisnici = () => {

  const navigate = useNavigate();
  if (!localStorage.token) {
    navigate("login");
  }

  const { ime } = useParams();
  const [korisnici, setKorisnici] = useState();
  const [pretraga, setPretraga] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let urlKorisnici = "";
    if (ime) {
      urlKorisnici = `http://localhost:8081/korisnici/pretraga/${ime}`;
    } else {
      urlKorisnici = "http://localhost:8081/korisnici";
    }
    const getKorisnici = () => axios.get(urlKorisnici);
    async function fetchData() {
      const [gotKorisnici] = await axios.all([getKorisnici()]);
      setKorisnici(gotKorisnici.data.korisnici);
      setLoading(false);
      return gotKorisnici;
    }
    fetchData();
  }, [ime]);

  const updateIme = (e) => {
    setPretraga(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/korisnici/${pretraga}`);
  }

  return (
    <div className="seasonContainer">
      {loading
        ? "Učitavanje"
        : korisnici && (
            <div>
              <h2>Korisnici</h2>
              <form onSubmit={handleSubmit} action="http:localhost:8081/korisnici" method="GET">
                <div className="input-group mb-3 w-50">
                  <input
                    type="text"
                    name="ime"
                    onChange={updateIme}
                    placeholder="Ime"
                    className="form-control"
                    aria-label="Ime"
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
                <div className="autoriGumbi">
                  <Link to="/korisnik" className="btn btn-success px-4 my-4">
                    Novi korisnik
                  </Link>
                </div>
              </form>
              {korisnici.map((korisnik) => (
                <AutoriLista
                  key={korisnik._id}
                  ime={korisnik.ime}
                  prezime={korisnik.prezime}
                  id={korisnik._id}
                  korisnik={true}
                />
              ))}
            </div>
          )}
    </div>
  );
};

export default Korisnici;
