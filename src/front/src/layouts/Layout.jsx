import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/NavBar/Navbar'
import { Footer } from '../components/Footer/Footer'

export default function Layout () {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}