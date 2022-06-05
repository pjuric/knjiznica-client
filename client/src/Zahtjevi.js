import axios from "axios";
import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import Zahtjev from "./components/Zahtjev";

export default function Zahtjevi() {
  const [zahtjevi, setZahtjevi] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  let urlZahtjevi;
  if (decodeToken(localStorage.getItem("token")).admin === true) {
    urlZahtjevi = "http://localhost:8081/zahtjevi";
  } else {
    urlZahtjevi = `http://localhost:8081/zahtjevi/korisnikzahtjevi/${
      decodeToken(localStorage.getItem("token")).id
    }`;
  }

  const navigate = useNavigate();

  if (!localStorage.token) {
    navigate("/login");
  }

  useEffect(() => {
    const getZahtjevi = () => axios.get(urlZahtjevi);
    async function fetchData() {
      const [gotZahtjevi] = await axios.all([getZahtjevi()]);
      setZahtjevi(gotZahtjevi.data.zahtjevi);
      setLoading(false);
      return gotZahtjevi;
    }
    fetchData();
    setToken(localStorage.getItem("token"));
    setUser(decodeToken(token));
  }, [urlZahtjevi, token]);

  return (
    <div>
      {loading ? (
        "Loading"
      ) : (
        <div className="container">
          {zahtjevi.length < 1 ? (
            <h2>Nema rezervacija</h2>
          ) : (
            <div className="d-flex flex-column">
              {zahtjevi.map((zahtjev) => (
                <Zahtjev
                  key={zahtjev._id}
                  id={zahtjev._id}
                  pocetak={zahtjev.pocetak}
                  kraj={zahtjev.kraj}
                  podignuta={zahtjev.podignuta}
                  vracena={zahtjev.vracena}
                  user={user.admin}
                  korisnickoIme={zahtjev.korisnickoIme}
                  knjigaNaziv={zahtjev.knjigaNaziv}
                  rezervirana={zahtjev.rezervirana}
                  korisnikId={zahtjev.korisnik}
                  knjigaId={zahtjev.knjiga}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
