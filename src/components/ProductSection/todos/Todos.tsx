import React, { useContext, useEffect } from "react"
import { View } from "react-native";
import Producto from "components/Producto";
import Context from "services/context"
const todos = ({navigation,disabled = false,...props}:any) => {
  const {lista,ExtraFunction} = useContext(Context);
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      ExtraFunction.current = null;
    });
    return unsubscribe;
  },[navigation]);
  return (
    <View style={{flex:1}}>
        <Producto.List  disabled={disabled} navigation={navigation} {...props}  list={lista} title={'Productos'} />
    </View>
  );
}

export default todos;