import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AutoriLista from "./components/AutoriLista";
import "./styles/autor.css";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

const Autori = () => {
  const navigate = useNavigate();
  const [autori, setAutori] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  if (!localStorage.token) {
    navigate("/login");
  }

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
    setToken(localStorage.getItem("token"));
    setUser(decodeToken(token));
  }, [urlAutori, token]);

  return (
    <div className="seasonContainer">
      {loading
        ? "Učitavanje"
        : autori && (
            <div>
              <h2>Autori</h2>
              <form action="http:localhost:8081/autori" method="GET">
                <div className="autoriGumbi">
                  {user.admin && (
                    <Link to="/noviautor" className="btn btn-success my-3">
                      Novi autor
                    </Link>
                  )}
                </div>
              </form>
              {autori.map((autor) => (
                <AutoriLista
                  key={autor._id}
                  ime={autor.ime}
                  prezime={autor.prezime}
                  id={autor._id}
                  admin={user.admin}
                  korisnik={false}
                />
              ))}
            </div>
          )}
    </div>
  );
};

export default Autori;
