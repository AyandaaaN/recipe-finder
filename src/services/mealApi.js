import axios from "axios";

const api = axios.create({ baseURL: "https://www.themealdb.com/api/json/v1/1" });

export const searchByIngredient = async (ingredient) => {
  const { data } = await api.get(`/filter.php`, { params: { i: ingredient } });
  return data?.meals ?? [];
};

export const getMealById = async (id) => {
  const { data } = await api.get(`/lookup.php`, { params: { i: id } });
  return data?.meals?.[0] ?? null;
};

export const listCategories = async () => {
  const { data } = await api.get(`/list.php?c=list`);
  return data?.meals ?? [];
};

export const filterByCategory = async (category) => {
  const { data } = await api.get(`/filter.php`, { params: { c: category } });
  return data?.meals ?? [];
};

export const randomMeal = async () => {
  const { data } = await api.get(`/random.php`);
  return data?.meals?.[0] ?? null;
};
