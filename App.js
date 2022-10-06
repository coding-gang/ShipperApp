import React,{useEffect,useState} from 'react';
import { NativeBaseProvider, extendTheme, Box, Text, Spinner } from 'native-base';
import RootNavigation from '@/navigations/RootNavigation';
import ToastAlert from '@/components/ToastAlert';
import store, { persistor } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { render } from 'react-dom';
import SplashScreen from 'react-native-splash-screen'
//const [isAppReady, setIsAppReady] = useState(false);
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {

  useEffect(()=>{
    SplashScreen.show();
    setTimeout(()=>{
      SplashScreen.hide();
    },5000)
  },[])
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <RootNavigation></RootNavigation>
          <ToastAlert></ToastAlert>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  ) 

}
