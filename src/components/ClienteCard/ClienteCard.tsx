import React, {useCallback, FC} from 'react';

import {
  AnimateContent,
  Container,
  Direccion,
  Info,
  Name,
  Style,
  height,
  width,
} from './style';
import Context from 'services/context';
import {useContext} from 'react';
import CustomImage from 'components/Image';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {shadowSetting} from 'theme';
import {BoxShadow} from 'react-native-shadow';
import { View } from 'react-native';

type ProfileScreenNavigationProp = StackNavigationProp<{}>;

type ClienteCardProps = {
  navigation: ProfileScreenNavigationProp;
  item: Item;
};
const color = '#e0dddd';
const ClienteCard: FC<ClienteCardProps> = ({item, navigation}) => {
  const shadowSet = {
    ...shadowSetting,
    width: width - 30,
    height: height / 10,
    style: {
      marginHorizontal:"auto",
       marginVertical:10,
       alignItems:"center",
       alignSelf:"center",
      justifyContent:"center"
      }
  };
  const {handleCDestino, colors} = useContext(Context);
  const colorspick = colors ? colors : {buttonsLight2: 'blue'};
  const selected = useCallback(() => {
    handleCDestino && handleCDestino(item.item);

    navigation.navigate('Cliente');
  }, []);

  return (
  <BoxShadow setting={shadowSet}>
    <Container android_ripple={{color}} onPress={selected}>
        <AnimateContent>
          <CustomImage />
          <Info>
            <Name>{item.item.nombre}</Name>
            <Direccion>
              <Icon
                color={colors?.secondary}
                name={'md-location-sharp'}
                size={12}
              />
              {item.item.direccion}
            </Direccion>
          </Info>
        </AnimateContent>
    
    </Container>
      </BoxShadow>
  );
};

export default React.memo(ClienteCard);
