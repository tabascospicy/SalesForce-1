import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Description from 'components/Description';
import ActionButtons from 'components/NavActionButtons';
import Producto from 'components/Producto';

import SearchInput from 'components/Inputs/SearchInput';
import useScrollAnimation from 'Hooks/ScrollAnimation/useScrollAnimation';
import {BlueBackground,Content,GlobalContainer,Productos} from "./style"
interface EmpresaProps {
  empresa:Empresa,
  productos:Product[]
}
const Empresa = ({empresa,productos,...props}:EmpresaProps) => {
  const [lista,setProductos] = useState(productos);
  const {ScrollEvent} = useScrollAnimation(400);
  const Buscar = (nombre:string)=>{
    const Filtrados  = productos &&  productos.filter((element,index)=>{
      return element.nombre.toLowerCase().includes(nombre.toLowerCase())
    });
    setProductos(prev => Filtrados || []);
  }
  return (
    <GlobalContainer>
      <BlueBackground >
      </BlueBackground>
      <ActionButtons {...props} />
      <Content >
        <Description  cliente={{...empresa}} />
        <Productos>Productos</Productos>
        <SearchInput buscar={Buscar} style="align-self:center;" />
        <Producto.List ScrollEvent={ScrollEvent} disabled {...props} list={lista} title={'Productos'} />
      </Content>
    </GlobalContainer>
  );
};

export default Empresa;
