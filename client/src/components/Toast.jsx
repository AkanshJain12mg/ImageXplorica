import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Close the toast after 3 seconds
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-red-100 text-black-900 p-3 rounded-lg shadow-lg animate-fade-in">
      {message}
    </div>
  );
}
