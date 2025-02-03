import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MovieDetails from "./pages/MovieDetails";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { ReviewProvider } from "./context/ReviewContext";


function App() {
  return (
    <ReviewProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        
      </Router>
    </ReviewProvider>
  );
}

export default App;