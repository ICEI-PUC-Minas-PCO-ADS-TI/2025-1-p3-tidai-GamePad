import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home/Home';
import News from '../pages/News/News';
import Games from '../pages/Games/Games';
import Login from '../pages/Login/login';
import Register from '../pages/Register/register';


export default function AppRoutes () {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/games" element={<Games />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}