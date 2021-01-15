import React, { useContext, useMemo, useRef, useState} from 'react';

import {List, ListContainer} from './styles';
import DetallesFactura from "components/Modal/DetalleFactura";
import FacturaCard from './Factura';

import { StackNavigationProp } from '@react-navigation/stack';
import { InteractionManager } from 'react-native';
import Context from "services/context";
import { Button } from 'react-native-paper';
type ProfileScreenNavigationProp = StackNavigationProp<RouteParamsList,'Pagar'>;
type FacturasProps = {
  cliente:Cliente,
  tipos:TipoFactura[],
  facturas:Factura[],
  navigation:ProfileScreenNavigationProp,
  isOnView:boolean
}
type El = {
  item:Factura
}

const Facturas = ({tipos,facturas,navigation,isOnView}:FacturasProps) => {
  const [detalles,setDetalles] = useState<DetalleFactura[]>([]);
  const [visible,setVisible] = useState(false);
  const {handleSelectedFactura,handleButtonActionFactura} = useContext(Context);
  const idRef = useRef<Factura>();
  const [pagar,setPagar] = useState(false);
  const PagarId = useRef(0);
  const hidePagar = () =>{
    setPagar(false);
  }
  const showPagar =(id:number)=>{
    PagarId.current = id
    setPagar(true);
  }
  const T = useMemo(()=>tipos.reduce((acum,current,index)=>{
    return {[index]:current,...acum}
  },{}),[tipos]);
  const showDialog = () => {setVisible(true)}
  const hideDialog = () => {setVisible(false)} 

  const marcarFacturado = () =>{
      console.log(idRef.current,"current factura")
      InteractionManager.runAfterInteractions(()=>{
        idRef.current && navigation.navigate("Pagar",{factura:idRef.current});
      })
  }
  const Boton =()=> <Button onPress={marcarFacturado}>Pagar</Button>
  const ShowDetalles = (detalles:DetalleFactura[],id:Factura)=>{
    idRef.current = id;
    handleSelectedFactura && handleSelectedFactura(id);
    handleButtonActionFactura && handleButtonActionFactura({action:Boton});
    InteractionManager.runAfterInteractions(()=>{
      idRef.current && navigation.navigate("Factura");
    })
  }
    return (
    <ListContainer>
     {isOnView && <List
        data={facturas}
        renderItem={(element) => <FacturaCard id={element.item.id} showPagar={showPagar} ShowDetalles={ShowDetalles} tipo={T[element.index].inicial} item={element.item} />}
        keyExtractor={(item: any) => item.id.toString()}
      />}
    </ListContainer>
  );
};

export default Facturas;
