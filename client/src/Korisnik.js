import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./styles/autor.css";
import { decodeToken } from "react-jwt";
import Home from "./Home";

const Korisnik = () => {
  const navigate = useNavigate();
  if (!localStorage.token) {
    navigate("/login");
  }
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [admin, setAdmin] = useState(false);
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [email, setEmail] = useState("");
  const [posudba, setPosudba] = useState(false);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(decodeToken(token));
    if (id) {
      const urlKorisnik = `http://localhost:8081/korisnici/${id}`;
      const getKorisnik = () => axios.get(urlKorisnik);
      async function fetchData() {
        const [gotKorisnik] = await axios.all([getKorisnik()]);
        setIme(gotKorisnik.data.korisnik.ime);
        setPrezime(gotKorisnik.data.korisnik.prezime);
        setAdmin(gotKorisnik.data.korisnik.admin);
        setKorisnickoIme(gotKorisnik.data.korisnik.korisnickoIme);
        setLozinka(gotKorisnik.data.korisnik.lozinka);
        setEmail(gotKorisnik.data.korisnik.email);
        setPosudba(gotKorisnik.data.korisnik.posudba);
        setStatus(gotKorisnik.data.korisnik.status);
        setLoading(false);
        return gotKorisnik;
      }
      fetchData();
    } else {
      setLoading(false);
    }
  }, [id, token]);

  const updateime = (e) => {
    setIme(e.target.value);
  };
  const updateprezime = (e) => {
    setPrezime(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const korisnikObject = {
      ime: ime,
      prezime: prezime,
      admin: admin,
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      email: email,
      posudba: posudba,
      status: status,
    };
    const qs = require("qs");
    if (id) {
      axios
        .put(
          `http://localhost:8081/korisnici/${id}`,
          qs.stringify(korisnikObject)
        )
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post("http://localhost:8081/korisnici", qs.stringify(korisnikObject))
        .catch((err) => {
          console.error(err);
        });
      setIme("");
      setPrezime("");
      setAdmin();
      setKorisnickoIme("");
      setLozinka("");
      setEmail("");
      setPosudba();
      setStatus();
      setLoading(false);
    }
    navigate("/korisnici");
  }

  function handleObrisi() {
    axios.delete(`http://localhost:8081/korisnici/${id}`).catch((err) => {
      console.error(err);
    });
    navigate("/korisnici");
  }

  return (
    <div>
      {loading ? (
        "Učitavanje"
      ) : !user?.admin ? (
        <Home />
      ) : (
        <div>
          <h2>Korisnik</h2>
          <form
            onSubmit={handleSubmit}
            action="http://localhost:8081/korisnici"
            method="POST"
            className="form"
          >
            <div className="input-group">
              <span className="input-group-text">Ime i prezime</span>
              <input
                type="text"
                aria-label="Ime"
                className="form-control"
                name="ime"
                onChange={updateime}
                value={ime}
                required
                placeholder="Ime"
              />
              <input
                type="text"
                aria-label="Prezime"
                className="form-control"
                name="prezime"
                onChange={updateprezime}
                value={prezime}
                required
                placeholder="Prezime"
              />
            </div>
            <div className="input-group mt-4">
              <span className="input-group-text">Email</span>
              <input
                type="text"
                aria-label="Email"
                className="form-control"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                required
                placeholder="Email"
              />
              <span className="input-group-text ms-3">Lozinka</span>
              <input
                aria-label="Email"
                className="form-control"
                type="password"
                name="lozinka"
                onChange={(e) => {
                  setLozinka(e.target.value);
                }}
                value={lozinka}
                required
                placeholder="Lozinka"
              />
            </div>
            <div className="input-group mt-4">
              <span className="input-group-text">Korisničko ime</span>
              <input
                type="text"
                aria-label="Korisničko ime"
                className="form-control"
                name="korisnickoIme"
                onChange={(e) => {
                  setKorisnickoIme(e.target.value);
                }}
                value={korisnickoIme}
                required
                placeholder="Korisničko ime"
              />
            </div>
            <div className="checkboxContainer">
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="admin"
                  id="admin"
                  onChange={(e) => {
                    setAdmin(e.target.checked);
                  }}
                  value={admin}
                  checked={admin}
                />
                <label className="form-check-label me-5" htmlFor="admin">
                  Admin
                </label>
              </div>
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="posudba"
                  id="posudba"
                  onChange={(e) => {
                    setPosudba(e.target.checked);
                  }}
                  value={posudba}
                  checked={posudba}
                />
                <label className="form-check-label" htmlFor="posudba">
                  Posudba
                </label>
              </div>
            </div>

            <div className="gumbi mt-4">
              <button type="submit" className="btn btn-warning px-4 me-4">
                Spremi
              </button>
              {id && (
                <button
                  className="btn btn-danger px-4 me-4"
                  onClick={handleObrisi}
                >
                  Obriši
                </button>
              )}
              <a href="/korisnici" className="btn btn-secondary px-4">
                Prekid
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Korisnik;
