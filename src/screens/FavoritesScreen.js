import React,{useCallback,useState} from 'react';
import {View,Text,FlatList,Pressable,Image,StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getFavorites} from '../storage/favorites';
export default function FavoritesScreen({navigation}){
 const [items,setItems]=useState([]);
 useFocusEffect(useCallback(()=>{getFavorites().then(setItems)},[]));
 return <View style={s.c}><Text style={s.h}>Favoritos</Text><FlatList data={items} keyExtractor={x=>x.idMeal} ListEmptyComponent={<Text>Nenhuma receita favoritada.</Text>} renderItem={({item})=><Pressable style={s.card} onPress={()=>navigation.navigate('Detalhes',{id:item.idMeal})}><Image source={{uri:item.strMealThumb}} style={s.img}/><Text style={s.t}>{item.strMeal}</Text></Pressable>}/></View>;
}
const s=StyleSheet.create({c:{flex:1,padding:16},h:{fontSize:22,fontWeight:'bold',marginBottom:12},card:{flexDirection:'row',alignItems:'center',marginBottom:10,backgroundColor:'#eee'},img:{width:80,height:80},t:{padding:10,fontWeight:'bold',flex:1}});
