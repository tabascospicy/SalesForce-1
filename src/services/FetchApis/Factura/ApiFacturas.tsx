import reactotron from "reactotron-react-native";
import Fetch from "services/fecth";
const defaultValue =
  [
    {
        "id": 1,
        "numero_factura": "00000001",
        "numero_fiscal": "1",
        "serial_impresora": "FORMA LIBRE",
        "fecha_at": "2020-11-04T01:03:59.000Z",
        "fecha_in": null,
        "adm_vendedor_id": 1,
        "adm_clientes_id": 4,
        "subtotal": "0.00",
        "subtotal_dolar": "20.60",
        "descuento": "0.00",
        "descuento_dolar": "0.00",
        "iva": "0.00",
        "iva_dolar": "3.30",
        "facturado": 1,
        "estatus_pago": 0,
        "abono": "0.00",
        "abono_dolar": "0.00",
        "adm_tipos_facturas_id": 6,
        "adm_usuarios_id": 3,
        "adm_caja_id": 1,
        "observacion": null,
        "adm_enc_presupuesto_id": null,
        "adm_enc_nota_entrega_id": null,
        "aviso_cobro_id": null,
        "adm_aviso_cobro": null,
        "anulada": 0,
        "aviso_cobro": null,
        "usuario_modificador": null,
        "devuelto": "0.00",
        "motivoreimpresion": null,
        "afecta_factura": null,
        "rest_pedidos_id": null,
        "fecha_hora": null,
        "coo": null,
        "estatus_entrega": null,
        "fecha_entrega": null,
        "fecha_vence": "2020-11-03T05:00:00.000Z",
        "devolucion_parcial": null,
        "adm_series_facturas_id": 2,
        "estatus_caja": null,
        "fecha": "2020-11-03T05:00:00.000Z",
        "detalles": [
            {
                "id": 1,
                "adm_enc_facturas_id": 1,
                "adm_conceptos_id": 3052,
                "adm_depositos_id": 1,
                "adm_vendedor_id": 1,
                "costo": "0.00",
                "costo_dolar": "1.65",
                "precio": "0.00",
                "precio_dolar": "2.06",
                "descuentopro": "0.00",
                "iva": "0.00",
                "iva_dolar": "3.30",
                "fecha_at": "2020-11-03T05:00:00.000Z",
                "cantidad": "10.000",
                "despachado": null,
                "devuelto": null,
                "adm_seriales_id": null,
                "monto_documento": "0.00",
                "adm_lotes_id": null,
                "observacion_caract": null,
                "devuelto_parcial": null,
                "adm_series_facturas_id": null
            }
        ]
    }
]

const FetchFacturas = async (setPercent:any,Tenant:string) => {
  try {
    const response = await Fetch(`factura/?estatus_pago=0&limit=1000`,{method:"GET",tenant:Tenant});
    const data = await JSON.parse(response.data).data;
    setPercent((prev:number)=>prev+10);
    const utildata = typeof(data) === "undefined" ? [defaultValue] : data;
    return utildata;
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
};
const UpdateFactura = async (id:number,Tenant:string)=>{
  try {
    const update = JSON.stringify({data:{estatus_pago:2}});
    const response = await Fetch(`factura/${id}`,{method:"POST",tenant:Tenant},update);
    const data = await JSON.parse(response.data);
  
    console.log("updated");
    const utildata = typeof(data) === "undefined" ? [defaultValue] : data;
    return utildata;
  } catch (e) {
    console.log(e, 'ha ocurrido un error \n \n \n');
    return 'hubo un error';
  }
}
export default {FetchFacturas,UpdateFactura};