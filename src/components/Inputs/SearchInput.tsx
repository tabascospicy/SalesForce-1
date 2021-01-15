import React, { useContext, useEffect, useState } from "react"
import {StyleSheet,Animated} from "react-native"
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import {f} from "styles"
import Context from "services/context";
const Box = styled(Animated.View)`
  flex-direction:row;
  width:55%;
  margin-top:10px;
  margin-bottom:10px;
  background-color:white;
  align-self:center;
  border-radius:5px;
`
const Lupa = styled(Icon)`
padding:5px;
opacity:0.8;
`
const Texto = styled.TextInput`
  width:80%;
  padding:3px;
  color:black;
  opacity:0.8;
  ${props=>f};
`
const shadow = StyleSheet.create({
  shadow: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
type Props = {
  animate?:{ScaleNav:Animated.Value},
  buscar:(e:string)=>void,
  remenber?:(e:string)=>void,
  value?:string,
  width?:string,
}
const SearchInput:React.FC<Props> = ({buscar,animate=null,remenber=null,value=null,width="80%"}) => {
  const [text,setText] = useState("");
  const {colors} = useContext(Context);
  const handleInput = (input:string)=>{
    setText(prev=>input);
  }
  useEffect(()=>{
    value && (setText(value),buscar(value));
  },[]);
  useEffect(()=>{
    buscar(text);
    remenber && remenber(text);
  },[text]);

  return (
    <Box  style={[{width},shadow.shadow,{ marginHorizontal:10},animate ? {transform:[{translateY:animate.ScaleNav}]} : {}]}>
      <Lupa size={25} color={colors["terceary-font"]} name="search"/>
      <Texto placeholder="Buscar" clearTextOnFocus onChangeText={handleInput} value={text} ></Texto>
    </Box>
  );
}

export default SearchInput;