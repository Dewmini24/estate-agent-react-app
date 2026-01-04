import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        
        {/* LEFT SIDE */}
        <div className="left-panel">
          <h1 className="app-title">Estate Agent App 🏙️</h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-panel">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyPage />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
      );
}

export default App;