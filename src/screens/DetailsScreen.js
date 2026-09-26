import React,{useEffect,useState} from 'react';
import {ScrollView,Text,Image,Pressable,ActivityIndicator,Alert,StyleSheet,View} from 'react-native';
import {getMealById} from '../services/api';
import {isFavorite,toggleFavorite} from '../storage/favorites';
import {addIngredientsToShoppingList} from '../storage/shoppingList';

function ingredients(meal){
 const list=[];
 for(let i=1;i<=20;i++){
   const name=meal[`strIngredient${i}`];
   const measure=meal[`strMeasure${i}`];
   if(name?.trim()) list.push({name:name.trim(),measure:measure?.trim()||''});
 }
 return list;
}
function steps(text){
 if(!text) return [];
 return text.replace(/\r/g,'\n').split(/\n+|(?<=[.!?])\s+(?=[A-Z])/).map(x=>x.trim()).filter(x=>x.length>2);
}

export default function DetailsScreen({route}){
 const [meal,setMeal]=useState(null),[fav,setFav]=useState(false),[loading,setLoading]=useState(true);
 useEffect(()=>{(async()=>{
   try { const m=await getMealById(route.params.id); setMeal(m); if(m)setFav(await isFavorite(m.idMeal)); }
   catch{Alert.alert('Erro','Não foi possível carregar a receita.');}
   finally{setLoading(false);}
 })();},[]);
 if(loading)return <ActivityIndicator size="large"/>;
 if(!meal)return <Text>Receita não encontrada.</Text>;
 const list=ingredients(meal), prep=steps(meal.strInstructions);

 async function favorite(){
   const updated=await toggleFavorite(meal);
   setFav(updated.some(x=>x.idMeal===meal.idMeal));
 }
 async function shopping(){
   await addIngredientsToShoppingList(list);
   Alert.alert('Lista de compras','Ingredientes adicionados à lista.');
 }

 return <ScrollView contentContainerStyle={s.container}>
   <Image source={{uri:meal.strMealThumb}} style={s.image}/>
   <Text style={s.title}>{meal.strMeal}</Text>
   <Pressable style={s.button} onPress={favorite}><Text style={s.white}>{fav?'Remover dos favoritos':'Favoritar receita'}</Text></Pressable>
   <Pressable style={s.shop} onPress={shopping}><Text style={s.white}>Adicionar à lista de compras</Text></Pressable>
   <Text style={s.subtitle}>Ingredientes</Text>
   {list.map((x,i)=><Text key={i}>• {x.measure} {x.name}</Text>)}
   <Text style={s.subtitle}>Modo de preparo passo a passo</Text>
   {prep.map((x,i)=><View key={i} style={s.step}><Text style={s.num}>{i+1}</Text><Text style={s.stepText}>{x}</Text></View>)}
 </ScrollView>;
}
const s=StyleSheet.create({
 container:{padding:16,paddingBottom:30},image:{width:'100%',height:230,borderRadius:12},title:{fontSize:26,fontWeight:'bold',marginVertical:12},
 button:{backgroundColor:'#d97706',padding:12,borderRadius:8,alignItems:'center'},shop:{backgroundColor:'#15803d',padding:12,borderRadius:8,alignItems:'center',marginTop:10},
 white:{color:'white',fontWeight:'bold'},subtitle:{fontSize:20,fontWeight:'bold',marginTop:22,marginBottom:8},
 step:{flexDirection:'row',marginBottom:12},num:{fontWeight:'bold',fontSize:18,width:30},stepText:{flex:1,fontSize:16,lineHeight:22}
});
