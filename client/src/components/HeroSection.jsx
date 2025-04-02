import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast"; // Import Toast component

export default function HeroSection({ isSignedIn }) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("histogram");
  const [toastMessage, setToastMessage] = useState(""); // State for toast message

  const handleNavigation = () => {
    if (selectedOption === "skeletonization" && !isSignedIn) {
      // Show purchase pro plan message using toast notification
      setToastMessage("Purchase Pro Plan for this feature!");
      setTimeout(() => {
        setToastMessage(""); // Hide the toast after 3 seconds
      }, 3000);
    } else {
      navigate(`/${selectedOption}`);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-[#0077B6] mb-6">Select an Image Processing Algorithm</h1>

      {/* Radio Menu */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-80">
        <form className="space-y-2">
          {[
            { id: "histogram", label: "Histogram Equalization" },
            { id: "gradient", label: "Gradient" },
            { id: "image-negative", label: "Image Negative" },
            { id: "template-matching", label: "Template Matching" },
            { id: "skeletonization", label: "Skeletonization (Pro)" },
          ].map((option) => (
            <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="algorithm"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                className="h-4 w-4 text-[#0077B6] focus:ring-[#0077B6]"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </form>
      </div>

      {/* Try It Button */}
      <button
        onClick={handleNavigation}
        className="mt-6 px-6 py-2 bg-[#0077B6] text-white rounded-lg shadow-md hover:bg-[#005F8E] transition"
      >
        Try It
      </button>

      {/* Display toast message if any */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </section>
  );
}
