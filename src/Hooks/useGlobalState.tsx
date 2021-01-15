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
  const {pressed, transform} = useCartAnimation();
  const [selectedView, setSelectedView] = useState('Empresa');
  const [selectedFactura, setSelectedFactura] = useState<Factura>();
  const [ButtonActionFactura, setButtonActionFactura] = useState({action:null});
  const showMensaje = ({
    visible,
    title,
    body,
    render = null,
    actions = null,
  }: MensajeContent) => {
    setMensaje({
      title,
      body,
      render,
      visible,
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
      return (acum +=
        parseFloat(current.precio_dolar) * (current.cantidad || 0));
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
    const oferta = Ofertas[0] as Oferta;
    console.log(oferta.min === cantidad || oferta.max === cantidad);
    return (oferta.min < cantidad && cantidad < oferta.max) ||
      oferta.min === cantidad ||
      oferta.max === cantidad
      ? parseInt(oferta.descuento)
      : 0;
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
    productosQr,
    toggleCarrito: pressed,
    ofertas: ofertas.current,
  };
};

export default useGlobalState;
