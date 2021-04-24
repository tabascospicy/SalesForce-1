import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import Context from 'services/context';
import DataBase from 'services/realm';
import {Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
const {customRequest, readAll} = DataBase();
type ProductoViewProps = {
  navigation: StackNavigationProp<RouteParamsList>;
  precioProductoDolar: string;
};

const useProductoView = ({
  navigation,
  precioProductoDolar,
}: ProductoViewProps) => {
  const {
    selectedProduct,
    addProduct,
    colors,
    descuento,
    qr,
    showQr,
    toggleCarrito,
  } = useContext(Context);
  const [Image, setImage] = useState<boolean>(false);
  const [descuentosVisible, setDescuentosVisible] = useState(false);
  const [detalles, setDetalles] = useState<DetallesToAdd>({
    categoria: '',
    subcategoria: '',
    marca: '',
    iva: 0,
  });
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const descuentoUi = useRef(0);
  const precio_dolar = parseFloat(precioProductoDolar);
  const descuentoValue = descuento ? parseInt(descuento?.descuento) : 100;
  const productoCantidad = selectedProduct
    ? selectedProduct.producto.cantidad
    : 0;
  const precio = useRef(precio_dolar - (descuentoValue / 100) * precio_dolar);

  const [cantidad, setCantidad] = useState<string>(`${productoCantidad || ''}`);
  const [visible, setVisible] = useState(false);
  const [niveles, setNiveles] = useState<Oferta[]>([]);
  const productosQr = useRef([]);
  const monto = useRef(0);
  const handleChange = (e: string) => {
    const cant = parseInt(e);
    /*const oferta = niveles.find(
      (element) =>
        (element.min < cant && cant < element.max) ||
        element.min === cant ||
        element.max === cant,
    );*/
    const init:Oferta = { id: 0,
      min: 0,
      max: 0,
      descuento: "",
      adm_conceptos_id: 0,
      status: 0}

    const oferta = niveles.reduce((acum,current)=>{
      return current.min <= cant && acum.min < current.min ? current :acum;
    },init)
    

    descuentoUi.current = oferta.min !=init.min ? parseInt(oferta?.descuento as string) : 0;
    const montoDescuento =
      (descuentoUi.current / 100) * parseFloat(precioProductoDolar);
    monto.current =
      parseFloat(precioProductoDolar) * parseInt(e === '' ? '0' : e) +
      (detalles.iva / 100) *
        parseFloat(precioProductoDolar) *
        (e === '' ? 0 : cant) -
      montoDescuento;
    setCantidad(e);
  };
  const add = () => {
    if (cantidad.length) {
      hideDialog();
      navigation.goBack();
      requestAnimationFrame(() => {
        const cant = parseInt(cantidad);
        addProduct && addProduct(selectedProduct?.producto as Product, cant,);
      });
    } else {
      Alert.alert('cantidad invalida');
    }
  };

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const hideDescuentos = () => setDescuentosVisible(false);
  const showImage = () => setImage(true);
  const showDescuentos = () => setDescuentosVisible(true);
  const hideImage = () => setImage(false);

  const AskDetalles = (realm: Realm) => {
    const marcasDB = realm.objects('marcas') as unknown as PropertieDescription[];
    const subcategoriasDB = realm.objects('subgrupo') as unknown as PropertieDescription[];
    const categoriasDB = realm.objects('grupo') as unknown as PropertieDescription[];
    const IvaDB = realm.objects('iva') as unknown as PropertieDescription[];
    //@ts-ignore
    const dBmarca = marcasDB.filtered(
      `id = ${selectedProduct?.producto.adm_marcas_id || 0 }`,
    ) as unknown as PropertieDescription[];
    const iv =
      selectedProduct?.producto.iva === 0
        ? [0]
        //@ts-ignore
        : IvaDB.filtered(`id = ${selectedProduct?.producto.iva}`);
        //@ts-ignore
    const dBsubcategoria = subcategoriasDB.filtered(
      `id = ${selectedProduct?.producto.adm_subgrupos_id}`,
    );
    //@ts-ignore
    const dBcategoria = categoriasDB.filtered(
      `id = ${selectedProduct?.producto.adm_grupos_id}`,
    );
    const parsed = Object.assign({}, marca[0]);

    setMarca(dBmarca[0].nombre);
    setCategoria(dBcategoria[0].nombre);
    setSubcategoria(dBsubcategoria[0].nombre);
    //@ts-ignore CTL Check this later 
    setDetalles({
      //@ts-ignore
      marca: marca[0].nombre,
      //@ts-ignore
      subcategoria: subcategoria[0].nombre,
      //@ts-ignore
      categoria: categoria[0].nombre,
      iva: parseInt(iv[0].porcentaje),
    });
  };
  const readOfertas = async () => {
    const product = selectedProduct?.producto as Product;
    const Ofertas = (await readAll(
      'ofertas',
      `adm_conceptos_id = ${product.id}`,
    )) as Oferta[];

    setNiveles(Ofertas);
  };
  useEffect(() => {
    customRequest(AskDetalles);
    readOfertas();
  }, []);
  useEffect(() => {
    precio.current = precio_dolar - (descuentoValue / 100) * precio_dolar;
  }, [descuento]);

  return {
    add,
    showQr,
    handleChange,
    productosQr,
    showDialog,
    hideDialog,
    visible,
    selectedProduct,
    addProduct,
    colors,
    toggleCarrito,
    descuento,
    detalles,
    qr,
    monto,
    precio,
    cantidad,
    showImage,
    hideImage,
    Image,
    niveles,
    descuentosVisible,
    hideDescuentos,
    showDescuentos,
    descuentoUi,
    marca,
    categoria,
    subcategoria,
  };
};

export default useProductoView;
