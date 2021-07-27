import React, { useCallback, FC } from 'react';

import {
  Container,
  Direccion,
  Info,
  Name,
  Style,
  height,
  width,
} from './style';
import Context from 'services/context';
import { useContext } from 'react';
import CustomImage from 'components/Image';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { shadowSetting } from 'theme';


type ProfileScreenNavigationProp = StackNavigationProp<{}>;

type ClienteCardProps = {
  navigation: ProfileScreenNavigationProp;
  item: Item;
};

const color = '#e0dddd';

const ClienteCard: FC<ClienteCardProps> = ({ item, navigation }) => {
  const { handleCDestino, colors } = useContext(Context);

  const selected = useCallback(() => {
    handleCDestino && handleCDestino(item.item);

    navigation.navigate('Cliente');
  }, []);
  const isStore = item.item?.cedula?.includes("J") || item.item?.nombre?.includes("C.A")
  return (
    
    <Container android_ripple={{ color }} onPress={selected}>
        <CustomImage src={isStore ?require("assets/shops.png") : require("assets/people.png")} />
        <Info>
          <Name>{item.item.nombre}</Name>
          <Direccion>
            <Icon
              color={colors?.secondary}
              name={'md-location-sharp'}
              size={12}
            />
            {item.item.direccion.toLowerCase()}
          </Direccion>
        </Info>
    </Container>
    
  );
};

export default React.memo(ClienteCard);
