import React, {useState, useRef, useCallback} from 'react';
import {Easing, Value, timing} from 'react-native-reanimated';

const usePagos = () => {
  const {factura} = route.params;
  const total = useRef(0);
  const {cliente, showMensaje, hideMensaje, getTenant,colors} = useContext(Context);
  const objetivoPagar = parseInt(factura.subtotal_dolar);
  const [pagos, setPagos] = useState<enviarInpustValues[]>([]);
  const [PagoPage, setPagoPage] = useState(0);
  const [tasa, setTasa] = useState('');
  const [empBancos, setEmpBancos] = useState([]);
  const pagoTemplate = useRef<enviarInpustValues>({});
  const from: number = PagoPage * 6;
  const to: number = (PagoPage + 1) * 6;
  const selectedBorrar = useRef(0);
  const [tiposDisponibles, setTiposDisponibles] = useState<TipoPago[]>([]);
  const [bancos, setBancos] = useState<Banco[]>([]);
  const [isAbono,setAbono] = useState<boolean>(false);
  const send = (x: any) => {
    const convertir =
      pagoTemplate.current.moneda === 'Bs'
        ? parseFloat(pagoTemplate.current.monto) / parseFloat(tasa)
        : parseFloat(pagoTemplate.current.monto);

    const isNotValid = convertir + total.current > objetivoPagar;
    showMensaje({visible: false, body: '', title: '', render: null});
    if (isNotValid) {
      InteractionManager.runAfterInteractions(() => {
        showMensaje({
          visible: true,
          title: '',
          body: 'ha ingresado un monto mayor al pago',
          render: SumarPago,
          actions: ActionsModal,
        });
      });
      return;
    }
    total.current += convertir;

    setPagos([...pagos, pagoTemplate.current]);
    pagoTemplate.current = {};
  };

  const Cargando = () => (
    <>
      <ActivityIndicator animating={true} color={Colors.red800} />
    </>
  );

  const reqTasa = async () => {
    try {
      const tasas = await Pagos.FechtTasa(getTenant() || '');
      const ban = await Pagos.FechtBancos(getTenant() || '');
      setEmpBancos(ban);

      setTasa(tasas[0].tasa);
    } catch (e) {
      setTasa('');
      console.log(e, 'tasa');
    }
  };
  const [handleLoadTasa, loadingTasa] = useLoading(reqTasa);
  const SumarPago = () => (
    <AdjuntarPago
      guardar={guardar}
      bancos={bancos}
      empBancos={empBancos}
      tiposDisponibles={tiposDisponibles}
    />
  );
  const ActionsModal = () => (
    <>
      <Button onPress={hideMensaje}>Cancelar</Button>
      <Button disabled={tasa === ''} onPress={send} mode="contained">
        Agregar Pago
      </Button>
    </>
  );
  const BorrarModal = () => (
    <>
      <Button onPress={hideMensaje}>Cancelar</Button>
      <Button disabled={tasa === ''} onPress={borrar} mode="contained">
        Borrar
      </Button>
    </>
  );
  const borrar = () => {
    const filtrados = pagos.filter(
      (element, index) => index !== selectedBorrar.current,
    );
    total.current -= parseFloat(pagos[selectedBorrar.current].monto);
    showMensaje({visible: false, title: 'A', body: '', render: null});
    setPagos(filtrados);
  };
  const setBorrarModal = (i: number) => {
    showMensaje({
      visible: true,
      title: 'Advertencia',
      body: 'esta seguro que desea borrar este pago?',
      render: null,
      actions: BorrarModal,
    });
    selectedBorrar.current = i;
  };
  const ShowModal = () => {
    let title = 'Agregar pago';
    let body = '';
    showMensaje({
      visible: true,
      title,
      body,
      render: SumarPago,
      actions: ActionsModal,
    });
  };
  const guardar = (name: NameParameter, value: string | number) => {
    pagoTemplate.current[name] = value;
  };
  const readTipos = async () => {
    const tipos = ((await readAll('TipoPago')) as unknown) as TipoPago[];
    const bancos = ((await readAll('Banco')) as unknown) as Banco[];
    setTiposDisponibles(tipos);
    setBancos(bancos);
  };

  const EnviarConfirmado = async () => {
    try {
      showMensaje({
        visible: true,
        body: '',
        title: 'Enviando',
        render: Cargando,
        actions: Cargando,
      });
      const response = await Pagos.Pagar(
        getTenant(),
        pagos,
        factura,
        cliente,
        tasa,
      );
      
      requestAnimationFrame(() => {
        showMensaje({
          visible: true,
          body: 'Enviado satisfactoriamente',
          title: 'Exito',
          render: null,
        });
        setTimeout(() => {
          navigation.navigate('Cliente');
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      reactotron.log && reactotron?.log(error);
      showMensaje({
        visible: true,
        title: 'Disculpe!',
        body: 'Pareceque ha habido un error en el envio de los datos',
        render: null,
      });
    }
  };
  useEffect(() => {
    readTipos();
    handleLoadTasa('');
  }, []);
  
  return {};
};

export default usePagos;