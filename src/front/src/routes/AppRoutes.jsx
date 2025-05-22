import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home/Home';
import News from '../pages/News/News';
import Games from '../pages/Games/Games';
import Comunidade from '../pages/Comunidade/Comunidade';


export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/games" element={<Games />} />
                <Route path="/Comunidade" element={<Comunidade />} />
            </Route>
        </Routes>
    )
}