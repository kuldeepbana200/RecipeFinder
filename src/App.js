import logo from "./logo.svg";
import "./App.css";
import CategoriesPage from "./components/CategoriesPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Recipes } from "./components/Recipes";
import Recipe from "./components/Recipe";
import { NavBar } from "./components/NavBar";
import { Area } from "./components/Area";

function App() {
  return (
    <Router>
      <div className=" bg-[#fffde7] font-playfair">
        <NavBar />
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/categories/:category" element={<Recipes />} />
          <Route path="/category/:recipe" element={<Recipe />} />
          <Route path="/cuisin/:area" element={<Area />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
