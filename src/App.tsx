import React from 'react';
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import './App.css';
import { ProtectedRoute } from './components/ProjectRoute/ProjectRoute';
import Dashboard from './pages/ACEdashboard/ACEDashboard';
import LoginPage from './pages/ACEUserloging/ACEUserloging';
import Register from './pages/ACEUserregister/ACEUserregister';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ACEUserloging" element={<LoginPage />} />
        <Route path="/ACEUserregister" element={<Register />} />
        <Route
          path="/ACEdashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
