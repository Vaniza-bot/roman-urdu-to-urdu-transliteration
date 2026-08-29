import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Transliterate from "./Transliterate";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import HowItWorks from "./components/sections/HowItWorks";
import WhyUse from "./components/sections/WhyUse";
import FAQ from "./components/sections/FAQ";
import AboutUs from "./components/sections/AboutUs";
import Contact from "./components/sections/Contact";
import Privacy from "./components/sections/Privacy";
import Terms from "./components/sections/Terms";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED MAIN APP */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* HOME */}
        <Route index element={<Home />} />

        {/* TRANSLITERATOR */}
        <Route path="transliterate" element={<Transliterate />} />

        {/* SECTIONS */}
        <Route path="how" element={<HowItWorks />} />
        <Route path="why" element={<WhyUse />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
      </Route>
    </Routes>
  );
}

export default App;
