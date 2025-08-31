import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Recipe from "./routes/Recipe.jsx";
import Favorites from "./routes/Favorites.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-inner">
          <h1 className="brand">
            <Link to="/">Recipe Finder</Link>
          </h1>
          <nav className="header-nav">
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorites</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <footer className="container footer">
  <span>© {new Date().getFullYear()} Recipe Finder</span>
</footer>

    </div>
  );
}
