import React, {useEffect, useRef, useState} from 'react';

import Database from 'services/realm';
import moment from 'moment';
import 'moment/locale/es-us';
import Grupos from 'services/FetchApis/Grupo';
import Marcas from 'services/FetchApis/Marcas';
import SubGrupos from 'services/FetchApis/SubGrupo';
import Pedidos from 'services/FetchApis/Pedidos';
import Planes from 'services/FetchApis/Planes';
import useCheckPermision from 'Hooks/useAskPermision';
import Iva from 'services/FetchApis/Iva';
import Usuario from 'services/FetchApis/User';
import Cliente from 'services/FetchApis/Clientes';
import Empresa from 'services/FetchApis/Empresa';
import Banco from 'services/FetchApis/banco';
import Facturas from 'services/FetchApis/Factura';
import TFactura from 'services/FetchApis/TiposFactura';
import Ofertas from 'services/FetchApis/Ofertas';
import Pagos from 'services/FetchApis/Pagos';
const {
  Write,
  WriteCliente,
  WriteUsuarios,
  SaveElements,
  addNombresToDetalles,
  realm,
} = Database();

type t = {
  tenantId: string;
};
type F = {
  Filled_at: string;
};

type DbClients = {
  clients: Cliente[];
};
const useStartCalls = (): DbContext => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [usuarioLog, setUsuario] = useState<IUsuario | placeholder>({
    nombre: '',
    login: '',
  });
  const [calling, setCalling] = useState<CallStatus>({
    success: null,
    loading: false,
  });
  const [reload, setReload] = useState(false);
  const [fecha, setFecha] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [percent, setPercent] = useState(0);
  const [empresa, setEmpresa] = useState<Empresa>({});
  const {checkStoragePermission} = useCheckPermision({});
  const [SesionState, setSesionState] = useState<SesionState>(0);
  const Tenant = useRef('');
  const ImageSrc = useRef('');
  useEffect(() => {
    if (VerificarTenant()) {
      checkStoragePermission();
      VerificarSesion();
      startAll();
    }
  }, []);

  useEffect(() => {
    if (reload) {
      startAll();
    }
  }, [reload]);
  const CheckAndStart = async () => {
    await checkStoragePermission();
    CallApi();
  };
  const handleCall = (x: CallStatus) => {
    setCalling(x);
  };
  const handleUsuario = (x: IUsuario | placeholder) => {
    setUsuario(x);
  };
  const handleEmpresa = (x: Empresa) => {
    setEmpresa(x);
  };
  const handleTenant = (T: string) => {
    Tenant.current = T;
  };
  const getTenant = () => {
    return Tenant.current;
  };
  const handleFecha = (x: string) => {
    setFecha(x);
  };
  const handleSesionState = (x: SesionState) => {
    setSesionState(x);
  };
  const cerrarSesion = () => {
    realm.write(() => {
      let Sesion = realm.objects('sesion');
      realm.delete(Sesion);
      setUsuario({nombre: '', login: ''});
      setSesionState(1);
    });
  };
  const VerificarTenant = () => {
    realm.write(() => {
      let Tenants = (realm.objects('tenant') as unknown) as t[];
      Tenant.current = Tenants.length ? Tenants[0].tenantId : '';
      ImageSrc.current = Tenant.current.split('_')[1];
      setSesionState(Tenants.length ? 1 : 0);
    });
    return Tenant.current ? true : false;
  };
  const VerificarSesion = () => {
    realm.write(() => {
      let Sesion = realm.objects('sesion');
      setSesionState(Sesion.length ? 2 : 1);
      const Logged = (Sesion[0] as unknown) as IUsuario;
      setUsuario(Sesion.length ? Logged : {nombre: '', login: ''});
    });
    return Tenant.current ? true : false;
  };
  const VerificarStorage = () => {
    var storage;
    realm.write(() => {
      let result = realm.objects('empresa');
      let clientesMap = realm.objects('clientList');
      let usuarios = realm.objects('usuario');
      let fecha = realm.objects('date');
      storage =
        result.length !== 0 &&
        clientesMap.length !== 0 &&
        usuarios.length !== 0;
    });
    return !storage;
  };
  const startAll = async (recall = false) => {
    try {
      realm.write(() => {
        let result = realm.objects('empresa');
        let clientesMap = realm.objects('clientList');
        let usuarios = realm.objects('usuario');
        let fecha = realm.objects('date');
        if (result.length && clientesMap.length && usuarios.length) {
          const load = result[0] as Empresa;
          const loadClientes = (clientesMap[0] as unknown) as DbClients;
          const Fech = (fecha[0] as unknown) as F;
          setClientes(loadClientes.clients || []);
          setProductos(load.productos || []);
          setEmpresa({
            adm_empresa_id: load.adm_empresa_id,
            correo_electronico: load.correo_electronico,
            nombre_comercial: load.nombre_comercial,
            direccion: load.direccion,
            imagen: load.imagen,
          });

          setFecha(Fech.Filled_at);
        } else {
          if (result.length) {
            const empresa = realm.create('empresa', {
              id: 1,
              nombre_comercial: 'Prueba',
              nombre: 'Prueba',
              correo_electronico: '',
              correo: '',
              totalCount: 0,
              imagen: '',
              direccion: 'Porlamar,Santiago Marino',
              adm_empresa_id: 1,
              nota: '',
              productos: [],
            });
          }
        }
      });
    } catch (error) {
      console.log(error, 'erroooor');
    }
  };
  const VerificarFecha = () => {
    let ultimaActualizacion = moment(fecha);
    let Hoy = moment(new Date());
    ultimaActualizacion.diff(Hoy, 'days');
    return true;
  };
  const cancelCalls = ()=>{
  }

  const CallApi  = async () => {
    setCalling({success: null, loading: true});
    try {
      setMensaje('cargando...');
      setPercent(0);
      const results = await AskData(Tenant, setPercent);
      setPercent((prev) => prev + 10);
      setMensaje('cargando Imagenes por favor espere');
      setUsuario({nombre: '', login: ''});
     
      const result = await Empresa.FetchAllImagesProductos(
        results[3].flat(),
        setPercent,
        Tenant.current,
        ImageSrc.current,
      );
      if (result === null) setCalling({success: false, loading: false});

      await SaveInDB(results, writeFecha);

      setMensaje('datos actualizados satisfactoriamente');
      setCalling({success: true, loading: false});
      startAll(true);
      setPercent(100);
      VerificarFecha();
    } catch (e) {
      console.log(e, 'calls error');
      setCalling({success: false, loading: false});
    }
  };

  const writeFecha = async () => {
    try {
      realm.write(() => {
        let fecha = realm.objects('date');
        const espanol = moment;
        espanol.locale('es-us');
        if (fecha.length) {
          const Fech = (fecha[0] as unknown) as F;
          Fech.Filled_at = espanol(new Date()).format('llll');
        } else {
          realm.create('date', {
            Filled_at: espanol(new Date()).format('llll'),
          });
        }
      });
    } catch (error) {
      console.log(error, 'errrooooooor');
    }
  };
  //respect the order of calls, to add a new one place it to the bottom
  async function AskData(
    Tenant: React.MutableRefObject<string>,
    setPercent: React.Dispatch<React.SetStateAction<number>>,
  ) {
    return await Promise.all([
      Usuario.FecthUserDataBase(Tenant.current),
      Cliente.FetchClientes(Tenant.current),
      Empresa.FetchEmpresaById(1, Tenant.current),
      Empresa.FetchConceptosEmpresa(1, Tenant.current),
      Grupos.FetchGrupos(setPercent, Tenant.current),
      Marcas.FetchMarcas(setPercent, Tenant.current),
      SubGrupos.FetchSubGrupos(setPercent, Tenant.current),
      Planes.FecthPlanes(setPercent, Tenant.current),
      Iva.FetchIva(setPercent, Tenant.current),
      Facturas.FetchFacturas(setPercent, Tenant.current),
      TFactura.FecthTiposFacturas(setPercent, Tenant.current),
      Ofertas.FechtOfertas(setPercent, Tenant.current),
      Pedidos.FechtStatusPedidos(Tenant.current),
      Banco.FetchBanco(Tenant.current),
      Pagos.FechtTipoPago(Tenant.current),
      Cliente.GetZonas(Tenant.current),
    ]);
  }

  async function SaveInDB(results: any[], writeFecha: () => Promise<void>) {
    try {
      await WriteCliente(results[1]);

      await Write(results[3], results[2]);
      await WriteUsuarios(results[0]);
      await SaveElements(results[4], 'grupo');
      await SaveElements(results[5], 'marcas');
      await SaveElements(results[6], 'subgrupo');
      await SaveElements(results[7], 'planes_pago');
      await SaveElements(results[8], 'iva');
      await SaveElements(results[9], 'factura');
      await SaveElements(results[10], 'TFactura');
      await SaveElements(results[11], 'ofertas');
      await SaveElements(results[12], 'statusPedido');
      await SaveElements(results[13], 'Banco');
      await SaveElements(results[14], 'TipoPago');
      await SaveElements(results[15], 'zona');
      await writeFecha();
    } catch (e) {
      console.log(e, 'errooooor');
    }
  }

  const AskPedidos = async (id: number) => {
    try {
      const Data = await Pedidos.FetchPedidosUsuario(id, Tenant.current);
      addNombresToDetalles(Data.detalles, (detallesConNombre) => {
        const ToSave = {
          ...Data,
          detalles: detallesConNombre,
        };
        SaveElements(ToSave, 'realizados');
      });
    } catch (e) {
      console.log(e, 'Error we');
    }
  };
  return {
    AskPedidos,
    empresa,
    usuarioLog,
    percent,
    handleFecha,
    productos,
    handleUsuario,
    clientes,
    CallApi,
    mensaje,
    handleCall,
    calling,
    cerrarSesion,
    handleSesionState,
    CheckAndStart,
    SesionState,
    VerificarFecha,
    ImageSrc,
    handleTenant,
    VerificarStorage,
    fecha,
    cancelCalls,
    getTenant,
  };
};

export default useStartCalls;
