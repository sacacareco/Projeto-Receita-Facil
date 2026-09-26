import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  timeout: 10000,
});

export async function searchMeals(term) {
  const r = await api.get(`/search.php?s=${encodeURIComponent(term)}`);
  return r.data.meals || [];
}

export async function searchMealsByIngredient(term) {
  const r = await api.get(`/filter.php?i=${encodeURIComponent(term)}`);
  return r.data.meals || [];
}

export async function getMealById(id) {
  const r = await api.get(`/lookup.php?i=${id}`);
  return r.data.meals?.[0] || null;
}

export async function getCategories() {
  const r = await api.get('/categories.php');
  return r.data.categories || [];
}

export async function getMealsByCategory(category) {
  const r = await api.get(`/filter.php?c=${encodeURIComponent(category)}`);
  return r.data.meals || [];
}
