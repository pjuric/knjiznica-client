import { useState } from "react";
import axios from "axios";

const NoviAutor = () => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [biografija, setBiografija] = useState("");
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
    axios
      .post("http://localhost:8081/autori", qs.stringify(autorObject))
      .then((response) => {
        console.log("Status: ", response.status);
        console.log(autorObject);
        console.log("Data: ", response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setIme("");
    setPrezime("");
    setBiografija("");
  }

  return (
    <div>
      <h2>Novi autor</h2>
      <form
        onSubmit={handleSubmit}
        action="http://localhost:8081/autori"
        method="POST"
      >
        <label>Ime</label>
        <input type="text" name="ime" onChange={updateime} value={ime} />
        <label>Prezime</label>
        <input
          type="text"
          name="prezime"
          onChange={updateprezime}
          value={prezime}
        />
        <label>Biografija</label>
        <input
          type="text"
          name="biografija"
          onChange={updatebiografija}
          value={biografija}
        />
        <a href="/">Prekid</a>
        <button type="submit">Spremi</button>
      </form>
    </div>
  );
};

export default NoviAutor;
