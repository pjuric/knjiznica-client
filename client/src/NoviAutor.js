import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import "./styles/autor.css";
import Home from "./Home";

const NoviAutor = () => {

  const navigate = useNavigate();
  if (!localStorage.token) {
    navigate("/login");
  }

  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [biografija, setBiografija] = useState("");
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(decodeToken(token));
    if (id) {
      const urlAutor = `http://localhost:8081/autori/${id}`;
      const getAutor = () => axios.get(urlAutor);
      async function fetchData() {
        const [gotAutor] = await axios.all([getAutor()]);
        setIme(gotAutor.data.autor.ime);
        setPrezime(gotAutor.data.autor.prezime);
        setBiografija(gotAutor.data.autor.biografija);
        setLoading(false);
        return gotAutor;
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
  const updatebiografija = (e) => {
    setBiografija(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const autorObject = {
      ime: ime,
      prezime: prezime,
      biografija: biografija,
    };
    const qs = require("qs");
    if (id) {
      axios
        .put(`http://localhost:8081/autori/${id}`, qs.stringify(autorObject))
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post("http://localhost:8081/autori", qs.stringify(autorObject))
        .catch((err) => {
          console.error(err);
        });
      setIme("");
      setPrezime("");
      setBiografija("");
    }
    navigate("/autori");
  }

  function handleObrisi() {
    axios.delete(`http://localhost:8081/autori/${id}`).catch((err) => {
      console.error(err);
    });
    navigate("/autori");
  }

  return (
    <div>
      {loading ? (
        "Učitavanje"
      ) : !user?.admin ? (
        <Home />
      ) : (
        <div>
          {id ? (
            <h2 className="h2">
              {ime} {prezime}
            </h2>
          ) : (
            <h2>Novi autor</h2>
          )}
          <form
            onSubmit={handleSubmit}
            action="http://localhost:8081/autori"
            method="POST"
            className="form"
          >
            <div className="input-group">
              <span className="input-group-text">Ime i prezime</span>
              <input
                type="text"
                name="ime"
                onChange={updateime}
                value={ime}
                aria-label="Ime"
                className="form-control"
                placeholder="Ime"
              />
              <input
                type="text"
                name="prezime"
                onChange={updateprezime}
                value={prezime}
                aria-label="Prezime"
                className="form-control"
                placeholder="Prezime"
              />
            </div>
            <div className="input-group mt-4">
              <span className="input-group-text">Biografija</span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                cols="40"
                rows="5"
                name="biografija"
                onChange={updatebiografija}
                value={biografija}
                placeholder="Biografija"
              ></textarea>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-warning px-4 me-4">
                Spremi
              </button>
              {id && (
                <button className="btn btn-danger px-4 me-4" onClick={handleObrisi}>
                  Obriši
                </button>
              )}
              <a href="/autori" className="btn btn-secondary px-4">
                Prekid
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NoviAutor;
