import React, {ReactText, useMemo, useRef, useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {Caption, TextInput} from 'react-native-paper';
import { View } from 'react-native';

type AdjuntarPagoProps = {
  tiposDisponibles: TipoPago[];
  bancos: Banco[];
  guardar:(name:string,value:string | number)=>void,
  empBancos:any
};

const AdjuntarPago: React.FC<AdjuntarPagoProps> = ({
  tiposDisponibles,
  bancos,
  guardar,
  empBancos
}) => {

  const [tipo, setTipo] = useState<ReactText>('');
  const [monto, setMonto] = useState('');
  const [referencia, setReferencia] = useState('');
  const [banco,setBanco] = useState("");
  const [Moneda,setMoneda] =useState("USD");
  const bancosEmpresa = useMemo(()=>empBancos.map((current:any)=>{
    return Object.assign(current,{nombre:bancos.find((element)=>element.id ===current.adm_entidad_id)?.nombre || "no encontrado"})
  }),[])
  const [empB,setEmpB] = useState("");
  const monedas = useMemo(()=>[{nombre:"Bs",id:1},{nombre:"USD",id:2}],[]);
  const isBanco = tipo.split("_")[0] === "TRANSFERENCIA" || tipo.split("_")[0] === "TARJETA DE DEBITO" ||tipo.split("_")[0] ==="TARJETA DE CREDITO";
  const filtrar = (valor: number): boolean => valor === 7 || valor === 5 || valor === 8 || valor === 2;
  const li =  useMemo(()=>tiposDisponibles.filter((element,index)=>!filtrar(element.id)),[]);
  const handleCambio = (setV:any,name:enviarKeys,value:string | number) =>{
    guardar(name,value)
    setV(value)
  }
  return (
    <>
      <Pick value={tipo} list={li} onChange={(value:any)=>handleCambio(setTipo,"adm_tipo_pago_id",value)} filter={filtrar} label={"Tipo de Pago"}  />
      {isBanco &&  <Pick value={banco} list={bancos} label={"Seleccione Banco de origen"} onChange={(value:any)=>handleCambio(setBanco,"banco_id",value)}  />}
      {isBanco &&  <Pick value={empB} list={bancosEmpresa} label={"Seleccione Banco de destino"} onChange={(value:any)=>handleCambio(setEmpB,"bancoDestino",value)}  />}
      <Pick value={Moneda} label={"Tipo de moneda "} list={monedas} onChange={(value:any)=>handleCambio(setMoneda,"moneda",value)}  />
      <TextInput
        label="Monto"
        value={monto}
        mode={"outlined"}
        keyboardType={"numeric"}
        onChangeText={(text)=>handleCambio(setMonto,"monto",text)}
      />
      <TextInput
        label="Referencia"
        value={referencia}
        mode={"outlined"}
        keyboardType={"numeric"}
        onChangeText={(text)=>handleCambio(setReferencia,"referencia",text)}
      />
    </>
  );
};
const Pick = ({value,list,onChange,filter=null,label=""}:any) =>{
 

  return(
    <>
    <Caption>{label}</Caption>
    <View style={{borderRadius:5,borderColor:"gray",borderWidth:0.3}}>
    <Picker
    selectedValue={value}
    onValueChange={(itemValue) => {
      onChange(itemValue)
    }}>
    <Picker.Item label="Seleccione" value="" />
    {list.map((element:any, key: number) => {
      return <Picker.Item
          key={key}
          label={`${element.nombre}`}
          value={`${element.nombre}_${element.id}`}
        />
    })}
    </Picker>
    </View>
    </>
  )
}
export default React.memo(AdjuntarPago);
