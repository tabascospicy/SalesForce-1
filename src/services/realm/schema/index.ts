import Realm from 'realm';
import EmpresaSchema from './EmpresaSchema';
import ProductoSchema from './ProductoSchema';
import Cliente from './clienteSchema';
import Fecha from './FechaSchema';
import pendienteSchema from './pendienteSchema';
import TagsSchemas from './TagsSchemas';
import userSchema from './usuarioSchema';
import sesion from './SesionSchema';
import Planes from "./planesPagoSchema";
import IvaScheme from "./Iva";
import FacturaSchema from "./FacturasSchema";
import Ofertas from "./OfertasSchema";
import BancoScheme from "./BancoSchema";
import Pagos from "./Pagos";
const user = {
  
}
export default new Realm({
  schema: [
    BancoScheme.Banco,
    ProductoSchema.Producto,
    ProductoSchema.existencia,
    EmpresaSchema.EmpresaSchema,
    EmpresaSchema.Tenant,
    Pagos.Tipo,
    Fecha,
    Planes,
    IvaScheme,
    Cliente.ClientList,
    Cliente.Clientes,
    Cliente.Zona,
    FacturaSchema.Factura,
    FacturaSchema.DetalleFactura,
    FacturaSchema.TFacturaSchema,
    sesion,
    Ofertas,
    pendienteSchema.Realizado,
    pendienteSchema.detalles,
    pendienteSchema.pedido,
    pendienteSchema.pendiente,
    pendienteSchema.PendienteDetalles,
    pendienteSchema.StatusPedido,
    TagsSchemas.Grupo,
    TagsSchemas.Marcas,
    TagsSchemas.SubGrupo,
    userSchema,
  ],
  schemaVersion: 9,
});
