import React from "react";

export default function Autori() {
  return (
    <div>
      <h2>Pretraži autore</h2>
      <form action="http://localhost:8081/autori" method="GET">
        <label>Ime</label>
        <input type="text" name="name" />
        <button type="submit">Pretraži</button>
      </form>
      <br/>
      
    </div>
  );
}
