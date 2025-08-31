import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealById } from "../services/mealApi.js";
import useFavorites from "../hooks/useFavorites.js";

function parseIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) list.push(`${ing}${meas ? ` — ${meas}` : ""}`);
  }
  return list;
}

export default function Recipe() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addFav, removeFav, isFav } = useFavorites();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const m = await getMealById(id);
      setMeal(m);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (!meal) return <p>Not found.</p>;

  const ingredients = parseIngredients(meal);

  const toggleFav = () => {
    const compact = { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb };
    isFav(meal.idMeal) ? removeFav(meal.idMeal) : addFav(compact);
  };

  return (
    <article>
      <h2>{meal.strMeal}</h2>
      <button onClick={toggleFav}>
        {isFav(meal.idMeal) ? "Remove from Favorites" : "Save to Favorites"}
      </button>
      <img src={meal.strMealThumb} alt={meal.strMeal} width={360} style={{maxWidth:"100%"}} />
      <p><strong>Category:</strong> {meal.strCategory ?? "—"}</p>
      <p><strong>Area:</strong> {meal.strArea ?? "—"}</p>

      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((line, i) => <li key={i}>{line}</li>)}
      </ul>

      <h3>Instructions</h3>
      <p style={{whiteSpace:"pre-wrap"}}>{meal.strInstructions}</p>

      {meal.strYoutube && (
        <p>
          <a href={meal.strYoutube} target="_blank" rel="noreferrer">Watch on YouTube</a>
        </p>
      )}
    </article>
  );
}
