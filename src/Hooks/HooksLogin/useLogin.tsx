import React, {
  useContext,
  useRef,
  useState,
} from 'react';
import Context from 'services/context';
import FechtUsuario from 'services/FetchApis/User';
import reactotron from 'reactotron-react-native';
import Database from 'services/realm';
import Global from 'services/variables_globales';
import jwt from 'react-native-pure-jwt';
import useAskPermision from 'Hooks/useAskPermision';
const {SaveElements} = Database();
export const useLogin = (navigation: any) => {
  const SlideRef = useRef();
  const [nombre, setNombre] = useState('');
  const {handleTenant,handleUsuario, colors, empresa, isNetworkAvailable,handleSesionState,showMensaje} = useContext(Context);
  const teclado = useRef();
  const {checkStoragePermission} = useAskPermision({});
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState(1);
  const showDialog = () => setVisible(true);
  const buttonText = useRef('Ya tienes Codigo?');
  const image =  require('assets/AFTIM.png');
  const Imagen = require('assets/AFTIM.png');
  const hideDialog = () => setVisible(false);

  const handleChange = (text: string) => {
    setNombre((prev) => text);
  };
  const handleCorreo = (text: string) => {
    setCorreo((prev) => text);
  };
  const handlePassword = (text: string) => {
    setPassword((prev) => text);
  };
 
  const LogOnline = async () => {
    try {
      const L: LoginData = {
        usuario: '',
        correo: correo,
        password: '',
      };
      const state = isNetworkAvailable && isNetworkAvailable();
      if(state){
        const response = await FechtUsuario.LoginRequest(L);
      }
    } catch (error) {
      reactotron.log && reactotron.log(error);
    }
  };
  const Log = async (SilRef:any) => {
    const state =isNetworkAvailable ? await isNetworkAvailable() : false;
    if (state) {
      await LogOnline();
      SilRef.current.animateNextTransition();
      showDialog();
      setView((prev) => (prev === 1 ? 2 : 1));
      buttonText.current = view === 2 ? 'Ya tienes Codigo?' : 'Volver';
    }
  };
  // cambiar directamente a la vista de ingresar codigo
  const enterCodigo = (SilRef:any) => {
    SilRef.current.animateNextTransition();
    setView((prev) => (prev === 1 ? 2 : 1));
    buttonText.current = view === 2 ? 'Ya tienes Codigo?' : 'Volver';
  };
  //desencriptar el token
  const Decript = async () => {
    try {
      const data = await jwt.decode(password, Global.TOKEN_KEY);
      return data.payload;
    } catch (error) {
      reactotron.log(error,"error we");
      return null;
    }
  };
  //guardar el token en la bd local
  const Store = async (tenant: any) => {
    try {
      const save = {
        nombre:tenant.nombre,
        correo:tenant.correo,
        id:tenant.id,
        tenantId:tenant.tenant
      }
      
      const result = await SaveElements([save], 'tenant');
      return result
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  const Verificar = async () => {
    const result: any = await Decript();
    checkStoragePermission();
    const state = isNetworkAvailable ? await isNetworkAvailable() :false;
    console.log(state,"verificar")
    if (result && state) {
      const error = await Store(result.Tenant);
  
      if(error){
        handleTenant &&  handleTenant(result.Tenant.tenant);
        handleSesionState && handleSesionState(1)
      }
    }else{
      showMensaje({title:"Error!",body:"Parece que su codigo no es valido",visible:true,render:null });
    }
  };
  return {
    Log,
    handleCorreo,
    handlePassword,
    nombre,
    setNombre,
    handleUsuario,
    correo,
    password,
    colors,
    empresa,
    teclado,
    image,
    visible,
    setVisible,
    hideDialog,
    Imagen,
    handleChange,
    view,
    enterCodigo,
    SlideRef,
    buttonText,
    Verificar,
  };
};
