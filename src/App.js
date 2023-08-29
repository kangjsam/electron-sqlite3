import React from "react";
import { Routes, Route } from "react-router-dom";

// Screens
import Home from "./screens/Home";
import Latest from "./screens/Latest";
import Search from "./screens/Search";
import Ratings from "./screens/Ratings";
import Details from "./screens/Details";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/search" element={<Search />} />
    <Route path="/latest" element={<Latest />} />
    <Route path="/ratings" element={<Ratings />} />
    <Route path="/details/:id" element={<Details />} />
  </Routes>
);

export default App;
