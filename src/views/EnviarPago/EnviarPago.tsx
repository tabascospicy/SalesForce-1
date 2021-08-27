import React from "react"
import styled from "styled-components/native";
import ActionButtons from 'components/NavActionButtons';
import Pagar from "./Pagar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

const Container = styled.View`
  flex-grow:1;
  flex-direction:column;
  padding:10px;
`
type ProfileScreenNavigationProp = StackNavigationProp<RouteParamsList,'Pagar'>;
type Params = RouteProp<RouteParamsList,"Pagar">
type PagarProps = {
  navigation:ProfileScreenNavigationProp,
  route:Params
}
const EnviarPago:React.FC<PagarProps> = ({navigation,route,...props}) => {
  return (
    <Container>
      <ActionButtons color={"black"} menu={false} back {...props} />
      <Pagar {...{navigation,route}} {...props}/>
    </Container>
  );
}

export default EnviarPago;