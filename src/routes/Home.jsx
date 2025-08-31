import { useMemo, useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import RecipeList from "../components/RecipeList.jsx";
import Featured from "../components/Featured.jsx";
import CategoryChips from "../components/CategoryChips.jsx";
import { searchByIngredient, listCategories, filterByCategory } from "../services/mealApi.js";

const intersectMeals = (arrays) => {
  if (!arrays.length) return [];
  const maps = arrays.map(arr => new Map(arr.map(m => [m.idMeal, m])));
  const ids = [...maps[0].keys()].filter(id => maps.every(map => map.has(id)));
  return ids.map(id => maps[0].get(id));
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [featured, setFeatured] = useState([]);

  const ingredients = useMemo(
    () => query.split(",").map(s => s.trim()).filter(Boolean),
    [query]
  );

  useEffect(() => {
    (async () => {
      try {
        const cats = await listCategories();
        setCategories(cats || []);
        const feats = await filterByCategory("Chicken");
        setFeatured((feats || []).slice(0, 8));
      } catch {
        // silent; not critical
      }
    })();
  }, []);

  const onSearch = async () => {
    setError("");
    setLoading(true);
    setSelectedCategory("");
    try {
      if (ingredients.length === 0) {
        setMeals([]);
      } else if (ingredients.length === 1) {
        setMeals(await searchByIngredient(ingredients[0]));
      } else {
        const results = await Promise.all(ingredients.map(i => searchByIngredient(i)));
        setMeals(intersectMeals(results));
      }
    } catch (e) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const onPickCategory = async (cat) => {
    setSelectedCategory(cat);
    setQuery(""); // clear search box when picking categories
    setError("");
    setLoading(true);
    try {
      const res = await filterByCategory(cat);
      setMeals(res || []);
    } catch {
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <div>
            <h1 className="hero-title">Find recipes by the ingredients you have</h1>
            <p className="hero-sub">
              Type one or more ingredients (e.g., <em>chicken, garlic</em>) and we’ll show matching recipes.
            </p>
            <SearchBar value={query} onChange={setQuery} onSearch={onSearch} />
            <CategoryChips
              categories={categories}
              selected={selectedCategory}
              onSelect={onPickCategory}
            />
          </div>
          {/* simple decorative block for desktop feel */}
          <div className="hero-ill" aria-hidden />
        </div>
      </section>

      {/* STATES */}
      {loading && (
        <div className="grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      )}
      {error && <p role="alert" className="empty">{error}</p>}

      {/* CONTENT */}
      {!loading && !error && meals.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Search results</h2>
            <span style={{ color: "var(--muted)" }}>{meals.length} found</span>
          </div>
          <RecipeList meals={meals} />
        </section>
      )}

      {!loading && !error && meals.length === 0 && (
        <Featured meals={featured} />
      )}
    </>
  );
}
