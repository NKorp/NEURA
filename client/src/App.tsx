import "./App.css";
import Navbar from "./components/Navbar.tsx";
import LaunchesTable from "./components/LaunchesTable.tsx";
import SavedLaunches from "./components/SavedLaunches.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LaunchesTable />} />
        <Route path="/saved" element={<SavedLaunches />} />
      </Routes>
    </Router>
  );
}

export default App;
