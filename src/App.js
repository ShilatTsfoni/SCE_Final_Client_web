import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Shifts from "./Pages/Shifts";
import Volunteers from "./Pages/Volunteers";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <div
        className="content"
        style={{ marginLeft: "100px", marginTop: "64px" }}
      >
        {" "}
        {/* Adjust these values based on actual dimensions */}
        <Routes>
          <Route path="/" element={<Shifts />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/volunteers" element={<Volunteers />} />
          {/* Additional routes can be defined here */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
