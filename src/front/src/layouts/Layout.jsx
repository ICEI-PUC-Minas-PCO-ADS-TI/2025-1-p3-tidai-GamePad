import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/Navbar";


export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-300">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
