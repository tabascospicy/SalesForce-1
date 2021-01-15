import {StackNavigationProp} from '@react-navigation/stack';
import useOnview from 'Hooks/onView';
import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import Context from 'services/context';
import Producto from './Producto';
import realm from 'services/realm/schema';
import accounting from 'accounting';
import {
  Container,
  List,
  Title,
  TitleContainer,
  IconContainer,
  Number,
  Column,
  Subtitle,
} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
type ProfileScreenNavigationProp = StackNavigationProp<{}>;
interface PropsClienteScreen {
  navigation: ProfileScreenNavigationProp;
  route: any;
}

const Factura = ({navigation, ...props}: PropsClienteScreen) => {
  const {isOnView} = useOnview({});
  const {selectedFactura, colors, ButtonActionFactura} = useContext(Context);
  const [productos, setProductos] = useState<string[]>([]);
  const {action} = ButtonActionFactura;
  useEffect(() => {
    readProductos();
  }, [selectedFactura]);
  const readProductos = async () => {
    try {
      realm.write(async () => {
        setProductos([]);
        const nombres = [];
        selectedFactura &&
          selectedFactura.detalles.forEach(async (element) => {
            let productDb = realm
              .objects('producto')
              .filtered(`id = ${element.adm_conceptos_id}`);
            nombres.push(productDb[0].nombre);
          });
        console.log(nombres);
        setProductos(nombres);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{flex: 1}}>
      <TitleContainer>
        <IconContainer>
          <Number style={{color: colors['primary-font']}}>
            {selectedFactura?.detalles.length}
          </Number>
          <Icon name="cart" size={30} color={colors['primary-font']} />
        </IconContainer>
        <Column>
          <Title style={{color: colors['primary-font']}}>Factura</Title>
          <Subtitle>Nro {selectedFactura?.numero_factura}</Subtitle>
          <Subtitle>
            subTotal:
            {accounting.formatMoney(selectedFactura?.subtotal_dolar, {
              symbol: '',
              thousand: '.',
              decimal: ',',
              precision: 2,
            })}
            $
          </Subtitle>
        </Column>
      </TitleContainer>
      {isOnView && (
        <Container>
          <List contentContainerStyle={{zIndex: 9}}>
            {selectedFactura?.detalles.map(
              (element: DetalleFactura, i: number) => {
                return (
                  <Producto
                    colors={colors}
                    {...props}
                    key={i}
                    producto={element}
                    nombre={productos[i]}
                  />
                );
              },
            )}
          </List>
        </Container>
      )}
      <TitleContainer>
        {isOnView && ButtonActionFactura ? action({}) : <></>}
      </TitleContainer>
    </View>
  );
};

export default Factura;
