// src/components/Navbar.jsx
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center max-w-screen-lg mx-auto">
       
      {/* <div className="md:hidden flex items-center"> Left Side: Hamburger Menu not working
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[#0077B6] focus:outline-none"
        >
          {menuOpen ? (
            <span className="text-2xl">X</span>  // Close icon
          ) : (
            <span className="text-2xl">☰</span>  // Hamburger icon
          )}
        </button>
        
        // Dropdown Menu Items for Mobile 
        {menuOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-10">
            <ul className="space-y-2">
              <li className="hover:text-[#0077B6] cursor-pointer">Profile</li>
              <li className="hover:text-[#0077B6] cursor-pointer">Try Our Products</li>
              <li className="hover:text-[#0077B6] cursor-pointer">My Plans</li>
              <li className="hover:text-[#0077B6] cursor-pointer">Contact Us</li>
            </ul>
          </div>
        )}
        </div> */ }

      {/* Logo (Optional) */}
      <div className="text-lg font-semibold text-[#0077B6] hidden md:block">
        ImgXplorica
      </div>

      {/* Right Side: Buttons */}
      <div className="flex space-x-4 hidden md:flex">
        <button className="border border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6] hover:text-white py-1.5 px-4 rounded-md transition duration-300">
          Go Pro
        </button>
        <button className="bg-[#0077B6] text-white hover:bg-[#005f8e] py-1.5 px-4 rounded-md transition duration-300">
          Sign In
        </button>
      </div>
    </nav>
  );
}
