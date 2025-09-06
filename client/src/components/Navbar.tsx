import { Link } from "react-router-dom";
import logo from "../assets/NEURA_logo.jpg";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-md z-50">
      <div className="mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-50 w-50 object-contain" />
          <span className="text-xl font-bold">SpaceX Launches</span>
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="hover:bg-black hover:text-white px-3 py-2 rounded transition"
          >
            Latest Launches
          </Link>
          <Link
            to="/saved"
            className="hover:bg-black hover:text-white px-3 py-2 rounded transition"
          >
            Saved Launches
          </Link>
        </div>
      </div>
    </nav>
  );
}
