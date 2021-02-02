import React from "react"
import styled from "styled-components/native";
import ActionButtons from 'components/NavActionButtons';
import Stepper from "./stepper"
const Container = styled.View`
  flex-grow:1;
  flex-direction:column;
  background-color:#484aa3;
  padding:10px;
`
const Checkout = (props:any) => {
  return (
    <Container>
      <ActionButtons  menu={false} back {...props} />
      <Stepper {...props}/>
    </Container>
  );
}

export default React.memo(Checkout);