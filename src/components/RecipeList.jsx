import RecipeCard from "./RecipeCard.jsx";

export default function RecipeList({ meals }) {
  if (!meals || meals.length === 0) {
    return <p className="empty">No results. Try another ingredient.</p>;
  }
  return (
    <div className="grid">
      {meals.map((m) => <RecipeCard key={m.idMeal} meal={m} />)}
    </div>
  );
}
