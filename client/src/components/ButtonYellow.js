import React from "react";
import "../styles/autor.css";

export default function ButtonYellow({ tekst }) {
  return (
    <div>
      <button type="submit" className="buttonYellow" value="">
        {tekst}
      </button>
    </div>
  );
}
