import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import reactotron from 'reactotron-react-native';
import {product, clienteDefault} from 'services/context/data';
import DataBase from 'services/realm';
import useCartAnimation from './useCartAnimation';
import useCheckConnection from './useCheckConnection';

const {readAll, customRequest} = DataBase();
const useGlobalState = (): UiContext => {
  const [cliente, setCDestino] = useState<Cliente>(clienteDefault);
  const [carrito, setCarrito] = useState<Product[]>([]);
  const [lista, setLista] = useState<Array<Product>>([]);
  const [descuento, setDescuento] = useState<PlanPago>({
    descuento: '',
    dia_final: 0,
    dia_inicial: 0,
    id: 0,
    nombre: '',
  });
  const ExtraFunction = useRef<VoidFunction>(() => {});
  const {pressed, transform,isCartOpen} = useCartAnimation();
  const [selectedView, setSelectedView] = useState('Empresa');
  const [selectedFactura, setSelectedFactura] = useState<Factura>();
  const [ButtonActionFactura, setButtonActionFactura] = useState({action:null});
  const [precios,setPrecios] = useState<number[]>([]);
  const showMensaje = ({
    visible,
    title,
    body,
    render = null,
    actions = null,
    lock = false,
  }: MensajeContent) => {
    setMensaje({
      title,
      body,
      render,
      visible,
      lock,
      actions,
    });
  };
  const [seeMessage, setMensaje] = useState<MensajeContent>({
    body: '',
    render: null,
    title: '',
    visible: false,
  });
  const [selectedProduct, setSelectedProduct] = useState({
    producto: product,
    shouldAdd: false,
  });
  const {isNetworkAvailable, isOnline} = useCheckConnection(showMensaje);
  const [qr, setQr] = useState(false);
  const showQr = () => {
    setQr(!qr);
  };
  const productosQr = useRef([]);
  const [filter, setFilter] = useState<Filtro>({
    nombre: '',
    id: '',
    display: '',
    db: null,
  });
  const ofertas = useRef<number[]>([]);
  const handleCDestino = (x: Cliente) => {
    setCDestino(x);
  };
  const handleLista = (x: Product[]) => {
    setLista(x);
  };
  const handleDescuento = (x: PlanPago) => {
    setDescuento(x);
  };
  const handleFilter = (x: Filtro) => {
    setFilter(x);
  };
  const handleSelectedProduct = (x: UiProduct) => {
    setSelectedProduct(x);
  };
  const handleSelectedView = (x: string) => {
    setSelectedView(x);
  };
  const handleSelectedFactura = (x: Factura) => {
    setSelectedFactura(x);
  };
  const handleButtonActionFactura = (x: any) => {
    setButtonActionFactura(x);
  };
  const hideMensaje = () => {
    setMensaje({
      title: '',
      body: '',
      render: null,
      visible: false,
      actions: null,
    });
  };
  const total = useMemo(() => {
    let total = carrito.reduce((acum: number, current: Product) => {
     const precio = parseFloat(current.precio_dolar);
     const descuento = current.oferta;
      return (acum +=
        (precio - precio * descuento/100) * (current.cantidad || 0));
    }, 0);

    return descuento
      ? (total = total - (parseInt(descuento.descuento) / 100) * total)
      : 0;
  }, [carrito]);

  const BuscarOferta = async (
    producto: Product,
    cantidad: number,
  ): Promise<number> => {
    const Ofertas: any = await readAll(
      'ofertas',
      `adm_conceptos_id = ${producto.id}`,
    );
    if (!Ofertas[0]) return 0;
    const oferta = Ofertas as Oferta[];
    const init:Oferta = { id: 0,
      min: 0,
      max: 0,
      descuento: "",
      adm_conceptos_id: 0,
      status: 0
    }

    const Concuerda = oferta.reduce((acum,current)=>{
      return current.min <= cantidad && acum.min < current.min ? current :acum;
    },init)
    return parseInt(Concuerda.descuento)
  };

  const resetCarrito = () => {
    setCarrito([]);
  };

  const deleteProduct = useCallback(
    (producto: Product) => {
      let index = 0;
      const filtered = carrito.filter((element, i) => {
        return element.id !== producto.id;
      });
      setCarrito((prev) => filtered);
      let template = [...precios];
      setPrecios(template.pop());
    },
    [carrito],
  );

  const addProduct = useCallback(
    async (producto: Product, cantidad: number, impuesto: number = 0) => {
      let id = -1;
      carrito.forEach((element, index) => {
        if (element.id === producto.id) {
          id = index;
        }
      });
      const oferta = await BuscarOferta(producto, cantidad);
      const EditRealmProduct = (realm: Realm) => {
        producto.oferta = oferta;
      };
      customRequest(EditRealmProduct);
      if (id === -1) {
        ofertas.current.push(oferta);
        setCarrito((prev) => [
          ...carrito,
          Object.assign(producto, {cantidad, impuesto}),
        ]);
        reactotron.log(producto,oferta);
      } else {

        setCarrito(
          carrito.map((element, i) => {
            if (element.id === producto.id) ofertas.current[i] = oferta;
            return element.id === producto.id
              ? Object.assign(producto, {cantidad, impuesto})
              : element;
          }),
        );
      }
    },
    [carrito],
  );

  const EditCantidad = useCallback(
    async (cantidad: number, position = 0) => {
      const copy = [...carrito];
      copy[position].cantidad = cantidad;
      ofertas.current[position] = await BuscarOferta(copy[position], cantidad);
      setCarrito(copy);
    },
    [carrito],
  );

  return {
    cliente,
    handleCDestino,
    hideMensaje,
    carrito,
    addProduct,
    total,
    resetCarrito,
    showMensaje,
    deleteProduct,
    selectedProduct,
    seeMessage,
    qr,
    isNetworkAvailable,
    isOnline,
    selectedFactura,
    ButtonActionFactura,
    handleSelectedFactura,
    showQr,
    handleSelectedProduct,
    lista,
    handleButtonActionFactura,
    handleLista,
    filter,
    handleDescuento,
    ExtraFunction,
    descuento,
    EditCantidad,
    selectedView,
    handleSelectedView,
    pressed,
    handleFilter,
    transformCarrito: transform,
    isCartOpen,
    productosQr,
    toggleCarrito: pressed,
    precios,
    ofertas: ofertas.current,
  };
};

export default useGlobalState;
