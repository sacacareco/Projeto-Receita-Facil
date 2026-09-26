import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = '@receita_facil_lista_compras';

export async function getShoppingList() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function addIngredientsToShoppingList(ingredients) {
  const current = await getShoppingList();
  const updated = [...current];

  ingredients.forEach(item => {
    if (!updated.some(x => x.name.toLowerCase() === item.name.toLowerCase())) {
      updated.push({
        id: `${Date.now()}-${Math.random()}`,
        name: item.name,
        measure: item.measure,
        checked: false
      });
    }
  });

  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export async function toggleShoppingItem(id) {
  const current = await getShoppingList();
  const updated = current.map(x => x.id === id ? {...x, checked: !x.checked} : x);
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export async function removeShoppingItem(id) {
  const current = await getShoppingList();
  const updated = current.filter(x => x.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export async function clearShoppingList() {
  await AsyncStorage.removeItem(KEY);
}
