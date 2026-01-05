import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </div>
  );
}

export default App;