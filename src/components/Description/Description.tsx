import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomImage from 'components/Image';
import {Container,Direction,Name,Portada,shadow} from './style';

interface DescriptionProps {
  cliente : Cliente | Empresa
}
const Description = ({cliente}: DescriptionProps) => {

  return (
    <Container>
      <Name font={"Nunito-italic"}>{ cliente?.nombre_comercial || cliente.nombre}</Name>
      <Portada style={shadow.shadow}>
        <CustomImage />
      </Portada>
    </Container>
  );
};

export default Description;
