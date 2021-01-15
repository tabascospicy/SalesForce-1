import SlideComponent from 'components/Animate/SlideComponent';
import useSesion from 'Hooks/Sesion';
import React, {useEffect, useRef} from 'react';
import {Image, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  TextInput,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import {Content, Box, Title, style, Logo, Footer,LeftTitle,Title1,Title2} from './styles';

const Sesion = ({dispatch, navigation}: any) => {
  const {
    Log,
    colors,
    teclado,
    visible,
    hideDialog,
    Imagen,
    handleChange,
    nombre,
    password,
    isOnline,
    saludo,
    handlePassword,
    loading,
  } = useSesion(navigation);

  return (
    <Content>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{color: colors.ButtonStrong}}>
            Nombre de usuario Incorrecto o contaseña
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Introduzca otro nombre de usuario o contraseña
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Hecho</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Logo>
      {isOnline && <Image
          resizeMode={'cover'}
          style={{width: 100, height: 100}}
          source={{
            uri: Imagen,
          }}
        />}
        <Title>Bienvenido</Title>
        <LeftTitle style={style.left}>
          <Title2 numberOfLines={1} style={style.align}>AFTIM/AFTIM/AFTIM/AFTIM/AFTIM/AFTIM</Title2>
          <Title1 numberOfLines={1} >{saludo.current.toUpperCase()}/{saludo.current.toUpperCase()}/{saludo.current.toUpperCase()}</Title1>
        </LeftTitle>
      </Logo>
      <Box style={style.shadow}>
        <View style={{height: 100, width: 280}}>
          {loading ? (
            <ActivityIndicator animating={true} color={Colors.red200} />
          ) : (
            <>
              <TextInput
                label={'Nombre de Usuario'}
                mode="outlined"
                ref={teclado}
                clearTextOnFocus
                placeholder={'Ingrese Nombre'}
                onChangeText={handleChange}
                value={nombre}
              />
              <TextInput
                label={'Contraseña'}
                mode="outlined"
                ref={teclado}
                clearTextOnFocus
                placeholder={'Ingrese Contrasena'}
                onChangeText={handlePassword}
                secureTextEntry={true}
                value={password}
              />
              <Button
                mode="contained"
                style={{marginTop: 10}}
                color={colors.ButtonStrong}
                onPress={Log}>
                Ingresar
              </Button>
            </>
          )}
        </View>

        <Footer>Desarrollado por Somos Sistemas C.A</Footer>
      </Box>
    </Content>
  );
};

export default Sesion;
