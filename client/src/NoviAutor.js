import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./styles/autor.css";

const NoviAutor = () => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [biografija, setBiografija] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [id]);

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
      ) : (
        <div>
          <h2>Novi autor</h2>
          <form
            onSubmit={handleSubmit}
            action="http://localhost:8081/autori"
            method="POST"
            className="form"
          >
            <div className="imePrezime">
              <div className="podImePrezime">
                <label>Ime</label>
                <input
                  type="text"
                  name="ime"
                  onChange={updateime}
                  value={ime}
                  className="autorInput"
                />
              </div>
              <div className="podImePrezime">
                <label>Prezime</label>
                <input
                  type="text"
                  name="prezime"
                  onChange={updateprezime}
                  value={prezime}
                  className="autorInput"
                />
              </div>
            </div>
            <label>Biografija</label>
            <textarea
              cols="40"
              rows="5"
              name="biografija"
              onChange={updatebiografija}
              value={biografija}
              className="biggerInput"
            ></textarea>
            <div className="gumbi">
              <button type="submit" className="buttonYellow">
                Spremi
              </button>
              {id && (
                <button className="buttonYellow" onClick={handleObrisi}>
                  Obriši
                </button>
              )}
              <a href="/autori" className="buttonYellow">
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
