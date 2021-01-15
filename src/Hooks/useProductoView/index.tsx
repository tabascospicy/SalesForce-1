import React, {useContext, useEffect, useRef, useState} from 'react';
import Context from 'services/context';
import DataBase from 'services/realm';
import useCartAnimation from 'Hooks/useCartAnimation';
import {Alert} from 'react-native';
import reactotron from 'reactotron-react-native';
import {StackScreenProps} from '@react-navigation/stack';
const {customRequest, readAll} = DataBase();
type ProductoViewProps = StackScreenProps<{}>;

const useProductoView = ({navigation}: ProductoViewProps) => {
  const {
    selectedProduct,
    addProduct,
    colors,
    descuento,
    qr,
    showQr,
    transform,
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
  const [marca,setMarca] = useState("");
  const [categoria,setCategoria] = useState("");
  const [subcategoria,setSubcategoria]= useState("")
  const descuentoUi = useRef(0);
  const precio_dolar = parseFloat(selectedProduct.producto.precio_dolar);
  const precio = useRef(
    precio_dolar - (descuento?.descuento / 100) * precio_dolar,
  );

  const [cantidad, setCantidad] = useState<string>(
    `${selectedProduct.producto.cantidad || ''}`,
  );
  const [visible, setVisible] = useState(false);
  const [niveles, setNiveles] = useState<Oferta[]>([]);
  const productosQr = useRef([]);
  const monto = useRef(0);
  const handleChange = (e: string) => {
    const cant = parseInt(e);
    const oferta = niveles.find(
      (element) =>
        (element.min < cant && cant < element.max) ||
        element.min === cant ||
        element.max === cant,
    );
    descuentoUi.current = oferta ? parseInt(oferta?.descuento as string) : 0;
    const product = selectedProduct?.producto as Product;
    const montoDescuento =
      (descuentoUi.current / 100) * parseFloat(product.precio_dolar);
    monto.current =
      parseFloat(product.precio_dolar) * parseInt(e === '' ? '0' : e) +
      (detalles.iva / 100) *
        parseFloat(product.precio_dolar) *
        (e === '' ? '0' : e) -
      montoDescuento;
    setCantidad(e);
  };
  const add = () => {
    if (cantidad.length) {
      hideDialog();
      navigation.goBack();
      requestAnimationFrame(() => {
        const cant = parseInt(cantidad);
        addProduct && addProduct(selectedProduct.producto, cant, detalles.iva);
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
    const marcasDB = realm.objects('marcas');
    const subcategoriasDB = realm.objects('subgrupo');
    const categoriasDB = realm.objects('grupo');
    const IvaDB = realm.objects('iva');
    const dBmarca = marcasDB.filtered(
      `id = ${selectedProduct.producto.adm_marcas_id}`,
      );
      const iv =
      selectedProduct.producto.iva === 0
      ? [0]
      : IvaDB.filtered(`id = ${selectedProduct.producto.iva}`);
      const dBsubcategoria = subcategoriasDB.filtered(
        `id = ${selectedProduct.producto.adm_subgrupos_id}`,
        );
        const dBcategoria = categoriasDB.filtered(
          `id = ${selectedProduct.producto.adm_grupos_id}`,
          );
          const parsed = Object.assign({},marca[0])
         
    setMarca(dBmarca[0].nombre);
    setCategoria(dBcategoria[0].nombre)
    setSubcategoria(dBsubcategoria[0].nombre);
    setDetalles({
      marca: marca[0].nombre,
      subcategoria: subcategoria[0].nombre,
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
    precio.current = precio_dolar - (descuento?.descuento / 100) * precio_dolar;
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
    transform,
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
