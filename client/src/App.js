import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NoviAutor from "./NoviAutor";
import Nav from "./components/Nav";
import Autori from "./Autori";
import Knjiga from "./Knjiga";
import Knjige from "./Knjige";
import Korisnici from "./Korisnici";
import Urediknjigu from "./Urediknjigu";
import Autor from "./Autor";
import Korisnik from "./Korisnik";
import Login from "./Login";
import Zahtjevi from "./Zahtjevi";

export default function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/knjige" element={<Knjige />}></Route>
        <Route path="/knjige/:naziv" element={<Knjige />}></Route>
        <Route path="/knjigadetalji/:id" element={<Knjiga />}></Route>
        <Route path="/urediknjigu" element={<Urediknjigu />}></Route>
        <Route path="/urediknjigu/:id" element={<Urediknjigu />}></Route>
        <Route path="/autori" element={<Autori />}></Route>
        <Route path="/autor" element={<Autor />}></Route>
        <Route path="/autor/:id" element={<Autor />}></Route>
        <Route path="/noviautor" element={<NoviAutor />}></Route>
        <Route path="/noviautor/:id" element={<NoviAutor />}></Route>
        <Route path="/korisnici" element={<Korisnici />}></Route>
        <Route path="/korisnici/:ime" element={<Korisnici />}></Route>
        <Route path="/korisnik/:id" element={<Korisnik />}></Route>
        <Route path="/korisnik/" element={<Korisnik />}></Route>
        <Route path="/zahtjevi/" element={<Zahtjevi />}></Route>
        <Route path="/odjava/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}