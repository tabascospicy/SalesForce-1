import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Content from './src/views';
import useStartCalls from './src/Hooks/useStartCalls';
import StateProvider from './src/services/context';
import {useColor} from './src/Hooks/useColorScheme';
import useGlobalState from './src/Hooks/useGlobalState';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Container} from './src/styles';
import {enableScreens} from 'react-native-screens';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {theme as appTheme} from "./src/theme";
enableScreens();

const Aplication = Container;
const theme = {
  ...DefaultTheme,
  colors:{
    primary:appTheme.primary,
    accent:appTheme.secondary,
  },
  dark: false,
};
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
const App = () => {
  const {productos, clientes, CallApi, ...rest} = useStartCalls();
  const colors = useColor();
  const State = useGlobalState();
  const AppContext = {
    productos,
    clientes,
    CallApi,
    ...rest,
    ...State,
    colors,
  };
  return (
    <StateProvider.Provider value={AppContext}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar backgroundColor={appTheme.primary} barStyle="light-content" />
          <Aplication
            align={'flex-start'}
            justify={'flex-start'}
            color={colors.primary}>
            <Content
              startAll={CallApi}
              clientes={clientes}
              productos={productos}
            />
          </Aplication>
        </SafeAreaProvider>
      </PaperProvider>
    </StateProvider.Provider>
  );
};

export default App;
