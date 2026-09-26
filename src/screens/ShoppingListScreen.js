import React,{useCallback,useState} from 'react';
import {View,Text,FlatList,Pressable,StyleSheet,Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getShoppingList,toggleShoppingItem,removeShoppingItem,clearShoppingList} from '../storage/shoppingList';

export default function ShoppingListScreen(){
 const [items,setItems]=useState([]);
 useFocusEffect(useCallback(()=>{getShoppingList().then(setItems)},[]));

 async function toggle(id){setItems(await toggleShoppingItem(id));}
 async function remove(id){setItems(await removeShoppingItem(id));}
 function clear(){
   Alert.alert('Limpar lista','Remover todos os itens?',[
     {text:'Cancelar',style:'cancel'},
     {text:'Limpar',style:'destructive',onPress:async()=>{await clearShoppingList();setItems([])}}
   ]);
 }

 return <View style={s.container}>
   <Text style={s.title}>Lista de compras</Text>
   {!items.length?<Text>Sua lista está vazia.</Text>:<>
   <FlatList data={items} keyExtractor={x=>x.id} renderItem={({item})=>
     <View style={s.item}>
       <Pressable style={s.main} onPress={()=>toggle(item.id)}>
         <Text style={s.check}>{item.checked?'☑':'☐'}</Text>
         <Text style={item.checked?s.done:null}>{item.measure} {item.name}</Text>
       </Pressable>
       <Pressable onPress={()=>remove(item.id)}><Text style={s.remove}>Remover</Text></Pressable>
     </View>}/>
   <Pressable style={s.clear} onPress={clear}><Text style={{color:'white'}}>Limpar lista</Text></Pressable>
   </>}
 </View>;
}
const s=StyleSheet.create({
 container:{flex:1,padding:16},title:{fontSize:22,fontWeight:'bold',marginBottom:16},item:{flexDirection:'row',alignItems:'center',paddingVertical:12,borderBottomWidth:1,borderColor:'#ddd'},
 main:{flex:1,flexDirection:'row',alignItems:'center'},check:{fontSize:24,marginRight:10},done:{textDecorationLine:'line-through',color:'#777'},remove:{color:'#b91c1c'},clear:{backgroundColor:'#b91c1c',padding:12,borderRadius:8,alignItems:'center',marginTop:15}
});
