import RecipeCard from "./RecipeCard.jsx";

export default function Featured({ meals = [] }) {
  if (!meals.length) return null;
  return (
    <section className="section">
      <div className="section-head">
        <h2>Featured this week</h2>
      </div>
      <div className="grid">
        {meals.slice(0, 8).map((m) => (
          <RecipeCard key={m.idMeal} meal={m} />
        ))}
      </div>
    </section>
  );
}
