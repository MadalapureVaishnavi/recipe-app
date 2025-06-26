import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RecipeHome from "./components/RecipeHome"; // This is your updated unified UI component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RecipeHome />} />
          <Route path="/generate-recipe" element={<RecipeHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
