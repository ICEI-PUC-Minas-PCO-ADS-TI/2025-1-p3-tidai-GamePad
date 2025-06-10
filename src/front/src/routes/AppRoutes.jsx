import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home/Home";
import News from "../pages/News/News";
import Games from "../pages/Games/Games";
import GameSelected from "../pages/Games/GameSelected";
import Comunidade from "../pages/Comunidade/Comunidade";
import Profile from "../pages/Profile/Profile";
import GamesSearch from "../pages/Games/GamesSearch";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/search/:searchTerm" element={<GamesSearch />} />
        <Route path="/games/:id" element={<GameSelected />} />
        <Route path="/Comunidade" element={<Comunidade />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Route>
    </Routes>
  );
}
