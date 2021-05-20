import React from 'react';
import CustomImage from 'components/Image';
import {Container,Name,Portada,shadow} from './style';

interface DescriptionProps {
  cliente : Cliente | Empresa
}
const Description = ({cliente}: DescriptionProps) => {

  return (
    <Container>
      <Name>{ cliente?.nombre_comercial || cliente.nombre}</Name>
      <Portada style={shadow.shadow}>
        <CustomImage />
      </Portada>
    </Container>
  );
};

export default Description;