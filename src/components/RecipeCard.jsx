import { Link } from "react-router-dom";

export default function RecipeCard({ meal }) {
  const { idMeal, strMeal, strMealThumb } = meal;
  return (
    <article className="card">
      <div className="card-media">
        <img src={strMealThumb} alt={strMeal} loading="lazy" />
      </div>
      <h4 className="card-title" title={strMeal}>{strMeal}</h4>
      <div className="card-actions">
        <Link className="btn-link" to={`/recipe/${idMeal}`}>View Details</Link>
      </div>
    </article>
  );
}
