import React, {useContext, useEffect, useState} from 'react';
import {Card, Title, width} from './styled';
import {DataTable} from 'react-native-paper';
import {Font} from 'styles';
import styled from 'styled-components/native';
import Context from 'services/context';
import Empresa from 'services/FetchApis/Empresa';
import {ActivityIndicator, Colors} from 'react-native-paper';
let CardInventario = styled.View`
  padding: 20px;
  margin: 10px;

  border-radius: 17px;
  align-self: center;
  background-color: white;
  z-index: 2;
`;
type Props = {
  concepto: number;
};
type Existencias = {
  existencia: string;
  id: number;
  nombre: string;
};
const Inventario: React.FC<Props> = ({concepto = 8}) => {
  const [pedidosPage, setPedidosPage] = useState<number>(0);
  const [existencias, setExistencias] = useState<Existencias[]>([]);
  const [loading, setLoading] = useState(false);
  const fromR: number = pedidosPage * 6;
  const toR: number = (pedidosPage + 1) * 6;
  const {getTenant} = useContext(Context);
  const depositos: any = [{id: 2}];
  const reqInventario = async () => {
    try {
      if (!getTenant) return;
      const Tenant = getTenant();
      console.log({concepto})
      setLoading(true);
      let {data} = await Empresa.FetchConcepto(concepto, Tenant);
      data = JSON.parse(data).data;
      const {data: depositosResponse} = await Empresa.FetchDepositosEmpresa(
        Tenant,
      );
      const depositos = JSON.parse(depositosResponse).data;
      const {existencias} = data;
      const mapExistencias: Existencias[] = existencias.map((exis: any) => {
        const {nombre} = depositos.find(
          (dep: any) => dep.id === exis.adm_depositos_id,
        );
        return {existencia: exis.existencia, nombre, id: exis.id};
      });
      setLoading(false);
      setExistencias(mapExistencias);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  useEffect(() => {
    reqInventario();
  }, []);
  return (
    <CardInventario>
      <Title style={{minWidth: width - 60}}>Disponibilidad</Title>
      <DataTable style={{width: width - 80}}>
        <DataTable.Header>
          <DataTable.Title>Deposito</DataTable.Title>
          <DataTable.Title numeric>existencia</DataTable.Title>
        </DataTable.Header>

        {loading ? (
          <DataTable.Row>
            <DataTable.Cell>
              <ActivityIndicator animating={loading} color={Colors.red800} />
            </DataTable.Cell>
            <DataTable.Cell>
              {' '}
              <ActivityIndicator animating={loading} color={Colors.red800} />
            </DataTable.Cell>
          </DataTable.Row>
        ) : (
            existencias.map((element, key: number) => {
            if (fromR <= key && key < toR) {
              return (
                <DataTable.Row>
                  <DataTable.Cell>{element.nombre}</DataTable.Cell>
                  <DataTable.Cell numeric>{element.existencia}</DataTable.Cell>
                </DataTable.Row>
              );
            }
          })
        ) }
        <DataTable.Pagination
          page={pedidosPage}
          numberOfPages={Math.floor(1 / 5) || 1}
          onPageChange={(page) => {
            setPedidosPage(page);
          }}
          label={` ${pedidosPage} of ${Math.floor(1 / 5) || 1}`}
        />
      </DataTable>
    </CardInventario>
  );
};

export default Inventario;
