import React, {useContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Context from 'services/context';
const useCheckConnection = (showMensaje:(mensaje:MensajeContent)=>void) => {
  const [isOnline, setOnline] = useState<boolean>(false);
  /* const CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          Alert.alert("You are online!");
        } else {
          Alert.alert("You are offline!");
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        handleFirstConnectivityChange
      );
    }
  };
  const handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      handleFirstConnectivityChange
    );
    if (isConnected === false) {
      Alert.alert("You are offline!");
    } else {
      Alert.alert("You are online!");
    }
  };*/
  const handleOnline = (status:boolean) =>{
    setOnline(status);
  }
  const isNetworkAvailable = async (check=true) => {
    try {
      const response = await NetInfo.fetch();
      setOnline(response.isConnected);
      handleOnline(response.isConnected);
      if(!response.isConnected && check){
        showMensaje({title:"Disculpe!",body:"Parece que la conexion a internet no esta disponible intente mas tarde",visible:true,render:null });
      }
      return response.isConnected;
    } catch (error) {
      console.log(error);
      handleOnline(false);
      return false;
    }
  };

  useEffect(() => {
    isNetworkAvailable();
  }, []);
  return { isNetworkAvailable, isOnline};
};

export default useCheckConnection;
