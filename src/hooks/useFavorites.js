import { useEffect, useState } from "react";

const KEY = "rf_favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) ?? []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFav = (idMeal) => favorites.some((m) => m.idMeal === idMeal);

  const addFav = (meal) => {
    setFavorites((prev) => (isFav(meal.idMeal) ? prev : [...prev, meal]));
  };

  const removeFav = (idMeal) => {
    setFavorites((prev) => prev.filter((m) => m.idMeal !== idMeal));
  };

  return { favorites, addFav, removeFav, isFav };
}
