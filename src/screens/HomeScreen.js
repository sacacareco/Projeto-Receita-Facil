import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, Pressable, ActivityIndicator, StyleSheet, Alert, ScrollView } from 'react-native';
import { searchMeals, searchMealsByIngredient, getCategories, getMealsByCategory } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [term,setTerm]=useState('');
  const [type,setType]=useState('name');
  const [meals,setMeals]=useState([]);
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    Promise.all([searchMeals('chicken'), getCategories()])
      .then(([m,c]) => { setMeals(m); setCategories(c); })
      .catch(() => Alert.alert('Erro','Não foi possível carregar os dados.'));
  }, []);

  async function search() {
    if (!term.trim()) return Alert.alert('Atenção','Digite algo para buscar.');
    setLoading(true);
    try {
      const data = type === 'name'
        ? await searchMeals(term.trim())
        : await searchMealsByIngredient(term.trim());
      setMeals(data);
      if (!data.length) Alert.alert('Aviso','Nenhuma receita encontrada.');
    } catch { Alert.alert('Erro','Falha ao consultar a API.'); }
    finally { setLoading(false); }
  }

  async function category(name) {
    setLoading(true);
    try { setMeals(await getMealsByCategory(name)); }
    catch { Alert.alert('Erro','Não foi possível filtrar.'); }
    finally { setLoading(false); }
  }

  return <View style={s.container}>
    <Text style={s.heading}>Encontre sua receita</Text>
    <View style={s.row}>
      <Pressable style={[s.choice,type==='name'&&s.selected]} onPress={()=>setType('name')}><Text>Por nome</Text></Pressable>
      <Pressable style={[s.choice,type==='ingredient'&&s.selected]} onPress={()=>setType('ingredient')}><Text>Por ingrediente</Text></Pressable>
    </View>
    <TextInput style={s.input} value={term} onChangeText={setTerm} placeholder={type==='name'?'Nome da receita':'Ingrediente'} />
    <Pressable style={s.button} onPress={search}><Text style={s.white}>Buscar</Text></Pressable>
    <Text style={s.subtitle}>Categorias</Text>
    <ScrollView horizontal style={{maxHeight:50}}>
      {categories.map(c=><Pressable key={c.idCategory} style={s.cat} onPress={()=>category(c.strCategory)}><Text>{c.strCategory}</Text></Pressable>)}
    </ScrollView>
    {loading ? <ActivityIndicator size="large"/> :
      <FlatList data={meals} keyExtractor={x=>x.idMeal} renderItem={({item})=>
        <Pressable style={s.card} onPress={()=>navigation.navigate('Detalhes',{id:item.idMeal})}>
          <Image source={{uri:item.strMealThumb}} style={s.image}/>
          <Text style={s.title}>{item.strMeal}</Text>
        </Pressable>} />}
  </View>;
}
const s=StyleSheet.create({
 container:{flex:1,padding:16},heading:{fontSize:24,fontWeight:'bold',marginBottom:10},
 row:{flexDirection:'row',gap:8},choice:{flex:1,padding:10,borderWidth:1,borderRadius:8,alignItems:'center'},
 selected:{backgroundColor:'#f59e0b'},input:{borderWidth:1,borderRadius:8,padding:12,marginVertical:10},
 button:{backgroundColor:'#d97706',padding:12,borderRadius:8,alignItems:'center'},white:{color:'white',fontWeight:'bold'},
 subtitle:{fontSize:18,fontWeight:'bold',marginTop:15},cat:{padding:9,borderWidth:1,borderRadius:18,margin:6},
 card:{marginVertical:8,backgroundColor:'#eee',borderRadius:10,overflow:'hidden'},image:{height:180,width:'100%'},title:{padding:10,fontWeight:'bold'}
});
