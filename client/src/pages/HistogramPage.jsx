
import { useState } from "react";
import Toast from "../components/Toast";
import axios from "axios";

export default function HistogramPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleGenerateImage = async () => {
    if (!selectedFile) {
      setToastMessage("Please upload a file before generating the image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/histogram", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // Expecting an image back
      });

      const imageUrl = URL.createObjectURL(response.data);
      setOutputImage(imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      setToastMessage("Error processing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-[#0077B6] mb-4">Histogram Equalization</h1>

      <div className="w-full max-w-4xl flex gap-6 bg-white shadow-md rounded-lg p-6">
        {/* Input Section */}
        <div className="flex-1 flex flex-col items-center border-2 border-gray-300 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Input</h2>
          <div className="w-full h-56 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg">
            {selectedFile ? (
              <p className="text-gray-700">{selectedFile.name}</p>
            ) : (
              <label className="cursor-pointer text-[#0077B6] font-semibold">
                Click to upload file
                <input
                  type="file"
                  className="hidden"
                  accept="image/png"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="flex-1 flex flex-col items-center border-2 border-gray-300 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <div className="w-full h-56 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg">
            {outputImage ? (
              <img src={outputImage} alt="Processed Output" className="max-h-full" />
            ) : loading ? (
              <p className="text-gray-500 animate-pulse">Processing...</p>
            ) : (
              <p className="text-gray-500">Output will appear here</p>
            )}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        className="mt-6 px-6 py-2 bg-[#0077B6] text-white font-semibold rounded-lg hover:bg-[#005f8e]"
        onClick={handleGenerateImage}
        disabled={loading}
      >
        {loading ? "Processing..." : "Generate Image"}
      </button>

      <p className="text-xs text-gray-500 mt-2">*File format should be PNG</p>

      {/* Toast */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
