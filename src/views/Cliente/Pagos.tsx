import React, { useContext, useMemo, useRef, useState} from 'react';

import {List, ListContainer} from './style';
import Pago from "./Pago";
import { StackNavigationProp } from '@react-navigation/stack';
import Context from "services/context";

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

const Pagos = ({tipos,facturas,navigation,isOnView}:FacturasProps) => {
  const {globalPagos} = useContext(Context);

    return (
    <ListContainer>
      {isOnView && <List
        data={globalPagos}
        renderItem={(element) => <Pago id={element.item?.id} {...element} />}
        keyExtractor={(item: any,index) =>index}
      />}
    </ListContainer>
  );
};

export default Pagos;
