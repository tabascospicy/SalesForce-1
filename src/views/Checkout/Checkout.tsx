import React from "react"
import styled from "styled-components/native";
import ActionButtons from 'components/NavActionButtons';
import Stepper from "./stepper";
import {theme} from "theme"
const Container = styled.View`
  flex-grow:1;
  flex-direction:column;
`
const Checkout = (props:any) => {
  return (
    <Container>
      <ActionButtons color={"black"}  menu={false} back {...props} />
      <Stepper {...props}/>
    </Container>
  );
}

export default React.memo(Checkout);