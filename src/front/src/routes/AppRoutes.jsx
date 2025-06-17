import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home/Home";
import News from "../pages/News/News";
import Games from "../pages/Games/Games";
import GameSelected from "../pages/Games/GameSelected";
import Profile from "../pages/Profile/Profile";
import GamesSearch from "../pages/Games/GamesSearch";
import Settings from "../pages/Settings/Settings";
import Guia from "../pages/Guia/Guia";
import ListView from "../pages/Profile/ListView";
import ListEdit from "../pages/Profile/ListEdit";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/search/:searchTerm" element={<GamesSearch />} />
        <Route path="/games/:id" element={<GameSelected />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/guia" element={<Guia />} />
        <Route path="/profile/list/:listId" element={<ListView />} />
        <Route path="/:username/list/:listId" element={<ListView />} />
        <Route path="/list/:listId/edit" element={<ListEdit />} />
      </Route>
    </Routes>
  );
}
