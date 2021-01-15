import React, { useContext } from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import Producto from './card/ProductoCart';
import Context from "services/context"
const Container = styled.SafeAreaView`
  flex-grow: 1;
  padding: 10px;
  padding-right:5px;
  width: 100%;
`;


const List = styled.ScrollView``;


const ProductList = ({title = '',productos=[] ,...props}: any) => {
  const {carrito} = useContext(Context);
  return (
    <View style={{flex: 1, width: '100%'}}>
      <Container>
        <List contentContainerStyle={{zIndex: 9}}>
          {carrito.map((element:Product,i:number)=>{
            return <Producto {...props} id={i} key={i} producto={element}/>
          })}
        </List>
      </Container>
    </View>
  );
};



export default React.memo(ProductList);