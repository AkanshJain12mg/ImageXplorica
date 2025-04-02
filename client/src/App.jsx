import { useState } from 'react'
import reactLogo from './assets/react.svg'

import Navbar from "./components/Navbar";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import HistogramPage from "./pages/HistogramPage";
import GradientPage from "./pages/GradientPage";
import ImageNegativePage from "./pages/ImageNegativePage";
import TemplateMatchingPage from "./pages/TemplateMatchingPage";
import SkeletonizationPage from "./pages/SkeletonizationPage";
import Footer from './components/Footer';

function App() {
 
  const isSignedIn = false;
  return (
    <Router>
      <Navbar />  {/* Navbar will always be visible at the top */}
      <Routes>
        <Route path="/" element={<HeroSection isSignedIn={isSignedIn} />} />

        <Route path="/histogram" element={<HistogramPage />} />
        <Route path="/gradient" element={<GradientPage />} />
        <Route path="/image-negative" element={<ImageNegativePage />} />
        <Route path="/template-matching" element={<TemplateMatchingPage />} />
        <Route path="/skeletonization" element={<SkeletonizationPage />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
