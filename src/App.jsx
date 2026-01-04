import SearchPage from "./pages/SearchPage";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      
      <div className="left-panel">
        <h1 className="app-title">Estate Agent App 🏙️</h1>
      </div>

      <div className="right-panel">
        <SearchPage />
      </div>

    </div>

      );
}

export default App;