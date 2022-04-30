import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NoviAutor from "./NoviAutor";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/noviautor" element={<NoviAutor />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

