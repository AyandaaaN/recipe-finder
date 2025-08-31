import RecipeList from "../components/RecipeList.jsx";
import useFavorites from "../hooks/useFavorites.js";

export default function Favorites() {
  const { favorites } = useFavorites();
  return (
    <>
      <h2>Favorites</h2>
      {favorites.length === 0 ? <p>No favorites yet.</p> : <RecipeList meals={favorites} />}
    </>
  );
}
