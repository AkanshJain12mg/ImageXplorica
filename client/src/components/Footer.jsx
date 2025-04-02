export default function Footer() {
    return (
      <footer className="bg-[#0077B6] text-white py-4 mt-6">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
          {/* Left Side - Contact Info */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <p>Email: contact@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
  
          {/* Right Side - Made With Love */}
          <div className="text-right">
            <p>Made with ❤️</p>
          </div>
        </div>
      </footer>
    );
  }
  