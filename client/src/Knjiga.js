import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/knjiga.css";

export default function Knjiga() {
  const { id } = useParams();
  const [knjiga, setKnjiga] = useState();
  const [loading, setLoading] = useState(true);
  const urlKnjiga = `http://localhost:8081/knjige/${id}`;

  useEffect(() => {
    const getKnjige = () => axios.get(urlKnjiga);
    async function fetchData() {
      const [gotKnjige] = await axios.all([getKnjige()]);
      setKnjiga(gotKnjige.data.knjiga);
      setLoading(false);
      return gotKnjige;
    }
    fetchData();
  }, [urlKnjiga]);
  return (
    <div>
      {loading ? (
        "Učitavanje"
      ) : (
        <div>
          <h2>Naziv</h2>
          <div className="knjgaDetaljiLayout">
            <div>
              <img src={`/knjige/${knjiga.coverImageName}`} alt="knjiga"/>
              <div className="urediObrisiGumbi">
                <Link to={`/urediknjigu/${id}`} className="buttonYellow">
                  Uredi
                </Link>
                <Link to={`/autor/${knjiga.autor}`} className="buttonYellow">
                  Autor
                </Link>
              </div>
            </div>
            <div className="knjigaDetaljiDesno">
              {/* <div className="knjigaDetaljiAtributi">
                <p className="naznačenTekst">Autor</p>
                <p className="">{knjiga.autor}</p>
              </div> */}
              <div className="knjigaDetaljiAtributi">
                <p className="naznačenTekst">Žanr</p>
                <p className="">{knjiga.zanr}</p>
              </div>
              <div className="knjigaDetaljiAtributi">
                <p className="naznačenTekst">Količina</p>
                <p className="">{knjiga.kolicina}</p>
              </div>
              <div className="knjigaDetaljiAtributi">
                <p className="naznačenTekst">Godina objavljivanja</p>
                <p className="">{knjiga.datumObjavljivanja.slice(0, 4)}</p>
              </div>
              <div className="knjigaDetaljiAtributi">
                <p className="naznačenTekst">Broj stranica</p>
                <p className="">{knjiga.brojStranica}</p>
              </div>
              <div className="knjigaDetaljiAtributiOpis">
                <p className="naznačenTekst">Opis</p>
                <p className="">
                {knjiga.opis}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
