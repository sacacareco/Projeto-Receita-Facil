import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY='@receita_facil_favoritos';
export async function getFavorites(){const d=await AsyncStorage.getItem(KEY);return d?JSON.parse(d):[];}
export async function isFavorite(id){return (await getFavorites()).some(x=>x.idMeal===id);}
export async function toggleFavorite(meal){
 const f=await getFavorites(), exists=f.some(x=>x.idMeal===meal.idMeal);
 const u=exists?f.filter(x=>x.idMeal!==meal.idMeal):[...f,meal];
 await AsyncStorage.setItem(KEY,JSON.stringify(u)); return u;
}
