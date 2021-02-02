import React, {useContext, useEffect, useRef, useState} from 'react';
import useLoadImages from 'Hooks/useLoadImages';
import FechtUser from 'services/FetchApis/User';
import reactotron from 'reactotron-react-native';
import Database from 'services/realm';
import FechImagenes from 'services/FetchApis/Imagenes';
const {SaveElements, readAll} = Database();
import Context from 'services/context';
const useSesion = (navigation: any) => {
  const SlideRef = useRef();
  const {handleUsuario, colors , SesionState, getTenant, handleSesionState,isNetworkAvailable,isOnline,showMensaje} = useContext(
    Context,
  );
  const teclado = useRef();
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const [loading, setLoading] = useState(false);
  const [Imagen, setImagen] = useState('');
  const saludo = useRef('');
  const hideDialog = () => setVisible(false);

  const Log = async () => {
    try {
      setLoading(true);
      const state = isNetworkAvailable ? await isNetworkAvailable() : false;
      if(!state){
      setLoading(false);
        return;
      }
      const res: IUsuario = await FechtUser.LoginUser(
        {password, user: nombre},
        getTenant ? getTenant() : '',
      );
      setLoading(false);
      if (res) {
        await SaveElements([res], 'sesion');
        handleUsuario && handleUsuario(res);
        handleSesionState && handleSesionState(2);
      } else {
        showDialog();
      }
    } catch (error) {
      handleSesionState && handleSesionState(0);
      console.log(error);
    }
  };
  const readImageUri = async () => {
    try {
       const data = await readAll('tenant');
       const client = data[0].tenantId.split('_')[1];
       saludo.current = client;
      const src = await FechImagenes.FechtLogo('logo.jpg', client);
      if (SesionState === 1) {
       
        setImagen(`file://` + src);
      }
    } catch (error) {
      console.log(error,"aqui");
    }
  };
  const handleChange = (text: string) => {
    setNombre((prev) => text);
  };
  const handlePassword = (text: string) => {
    setPassword((prev) => text);
  };
  useEffect(() => {
    const promise = readImageUri();
  }, []);
  return {
    SlideRef,
    handleUsuario,
    handlePassword,
    handleChange,
    colors,
    teclado,
    nombre,
    password,
    visible,
    showDialog,
    Imagen,
    hideDialog,
    Log,
    loading,
    saludo,
  };
};

export default useSesion;
