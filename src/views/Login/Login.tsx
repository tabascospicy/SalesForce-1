import SlideComponent from 'components/Animate/SlideComponent';
import {useLogin} from 'Hooks/HooksLogin/useLogin';
import React from 'react';
import {Image, View,Dimensions} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {Button, Paragraph, Dialog, Portal, TextInput} from 'react-native-paper';
const {height} = Dimensions.get("screen");
import {
  Content,
  Box,
  Title,
  style,
  Logo,
  Footer,
  Title1,
  Title2,
  LeftTitle,
} from './styles';

const Login = ({dispatch, navigation}: any) => {
  const {
    Log,
    colors,
    teclado,
    visible,
    hideDialog,
    Imagen,
    view,
    buttonText,
    enterCodigo,
    handleCorreo,
    correo,
    password,
    handlePassword,
    Verificar,
  } = useLogin(navigation);
  return (
    <Content >
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            Sera enviado un correo a la empresa seleccionada con el codigo para la app
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>Ingrese al correo para copiar el codigo</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Hecho</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Logo>
        <LeftTitle style={style.left}>
          <Title2 style={style.align} numberOfLines={1}>AFTIM/AFTIM/AFTIM/AFTIM/AFTIM</Title2>
        <Title1 numberOfLines={1}>SOMOSSISTEMAS/SOMOSSISTEMAS</Title1>
        </LeftTitle>
        
        <Image
          resizeMode="contain"
          style={{height: 120}}
          width={50}
          height={60}
          source={Imagen}
        />
        <Title>Bienvenido</Title>
      </Logo>
      <Box style={style.shadow}>
        <SlideComponent
          
          render={(ref) => (
            <>
              <Button
                style={{marginTop:"auto"}}
                onPress={() => enterCodigo(ref)}>
                {buttonText.current}
              </Button>
            </>
          )}>
          {(ref: any) => {
            return (
              <>
                {view === 1 && (
                  <>
                    <TextInput
                      label={'Correo de la Empresa'}
                      mode="outlined"
                      ref={teclado}
                      color={colors.ButtonStrong}
                      clearTextOnFocus
                      placeholder={'Ingrese Correo'}
                      onChangeText={handleCorreo}
                      value={correo}
                    />
                    <Button
                      mode="contained"
                      style={{marginTop: 10}}
                      color={colors.ButtonStrong}
                      onPress={() => Log(ref)}>
                      Enviar
                    </Button>
                  </>
                )}
                {view === 2 && (
                  <>
                    <TextInput
                      label="Codigo de Confirmacion"
                      mode="outlined"
                      ref={teclado}
                      clearTextOnFocus
                      selectionColor={colors.ButtonStrong}
                      placeholder={'Ingrese Codigo'}
                      onChangeText={handlePassword}
                      value={password}
                    />
                    <Button
                      disabled={password === ''}
                      style={{marginTop: 10}}
                      mode="contained"
                      
                      color={colors.ButtonStrong}
                      onPress={Verificar}>
                      Ingresar
                    </Button>
                  </>
                )}
              </>
            );
          }}
        </SlideComponent>
        <Footer>Desarrollado por Somos Sistemas C.A</Footer>
      </Box>
    </Content>
  );
};

export default Login;
