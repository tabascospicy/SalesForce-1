import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {Dimensions, View,FlatList,SafeAreaView, StyleSheet} from 'react-native';
import ProductoCard from './Card';
import Context from "services/context";
import DataBase from 'services/realm';
const {height} = Dimensions.get("window");
import Animated from "react-native-reanimated"




const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})
const {customRequest} = DataBase();
const ProductList = ({ScrollEvent=()=>{},disabled=false,title = '',list = [] ,cart =false,...props}: any) => {
  const [detalles,setDetalles] = useState({marcas:[],categoria:[]});
  const AskDetalles = (realm: Realm) => {
    const marcasDB = realm.objects('marcas');
    const categoriasDB = realm.objects('grupo');
    setDetalles({
      marcas: marcasDB,
      categoria:categoriasDB,
    });
  };

  useEffect(()=>{
    customRequest(AskDetalles);
  },[])
  return (
      <SafeAreaView style={styles.container}>
        <AnimatedFlatList
         scrollEventThrottle={16}
        renderItem={(item:any,index:number)=> <ProductoCard ind={index} detalles={detalles} disabled={disabled} key={index} producto={item} {...props} />}
        keyExtractor={(item:any) => item.id.toString()}
        maxToRenderPerBatch={10}
        data={list}
        />
      </SafeAreaView>
  );
};


 export default React.memo(ProductList);
