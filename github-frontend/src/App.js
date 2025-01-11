import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetails from './pages/UserDetails.js';
import HomePage from './pages/HomePage';
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/user-details/:username" element={<UserDetails />} /> 
      </Routes>
    </Router>
  );
}

export default App;
