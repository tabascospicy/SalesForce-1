import React, {useContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Context from 'services/context';
const useCheckConnection = (showMensaje:(mensaje:MensajeContent)=>void) => {
  const [isOnline, setOnline] = useState<boolean>(false);
 
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
