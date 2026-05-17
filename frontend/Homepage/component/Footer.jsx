import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 py-12 border-t border-white/10 bg-[#0b0b0c]">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-bold">
            C
          </div>
          <span className="text-white font-semibold text-lg">
            Convofy
          </span>
        </div>

        {/* Middle Links */}
        <div className="flex items-center gap-6 text-zinc-400 text-sm">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>

          <a href="#about" className="hover:text-white transition">
            About
          </a>

          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>

          <Link to="/auth" className="hover:text-white transition">
            Login
          </Link>
        </div>

        {/* Right */}
        <p className="text-zinc-500 text-sm text-center md:text-right">
          © 2026 Convofy. All rights reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;