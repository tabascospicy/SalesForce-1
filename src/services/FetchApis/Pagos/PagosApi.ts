import reactotron from 'reactotron-react-native';
import Fetch from 'services/fecth/index';
import Factura from "services/FetchApis/Factura";
const tipos = {
  "TRANSFERENCIA": 'movimiento_banco',
  "TARJETA DE DEBITO": 'movimiento_banco',
  "TARJETA DE CREDITO": 'movimiento_banco',
  "DIVISA": 'movimiento_caja',
  "EFECTIVO": 'movimiento_caja'
}
type Moneda = "Bs" | "USD";
type Abono = {
  tercero: number,
  fecha_at: string,
  monto: string,
  tipo: string,
  monto_dolar: string,
  descripcion: string,
  monto_restante: string,
  monto_restante_dolar: string
}
type ParameterAbono = {
  isAbono: boolean,
  total: number //USD
}
type pago = "TRANSFERENCIA" | "TARJETA DE DEBITO" | "TARJETA DE CREDITO" | "DIVISA";
const makeMovCaja = (tipoId: string, bancoId: string, Pago: enviarInpustValues, factura: Factura, cliente: Cliente): MovCaja => {
  return {
    adm_banco_id: parseInt(bancoId || '0'),
    adm_tipo_movimiento_id: 1,
    adm_tipo_pago_id: parseInt(tipoId || '0'),
    adm_caja_id: 1,
    credito: 0,
    credito_dolar: 0,
    debito: parseFloat(Pago.monto),
    numero_origen: "0",
    descripcion: 'PAGO FACTURA',
    referencia: Pago.referencia || '',
    fecha_at: new Date().toISOString().substr(0, 10),
  };
};
const makeMovBanco = (tipoId: string, bancoId: string, Pago: enviarInpustValues, factura: Factura, cliente: Cliente): MovBanco => {
  const moneda = Pago.moneda;

  return {
    adm_caja_id: 1,
    adm_tipo_movimiento_id: 2,
    adm_tipo_pago_id: parseInt(tipoId || '0'),
    documento: factura.id,
    credito: moneda === "Bs" ? parseFloat(Pago.monto) : 0,
    credito_dolar: moneda === "USD" ? parseFloat(Pago.monto) : 0,
    debito: 0,
    descripcion: 'PAGO FACTURA',
    fecha_at: new Date().toISOString().substr(0, 10),
    adm_banco_id: parseInt(bancoId || '0'),
    beneficiario: cliente?.id || 0,
    referencia: Pago.referencia || '',
  };
};
const makeCobranza = (factura: Factura, cliente: Cliente, tasa: string) => {
  return {
    adm_clientes_id: cliente?.id || 0,
    descuento: 0, //
    descuento_dolar: 0, //
    documento: factura.id,
    fecha_at: new Date().toISOString().substr(0, 10),
    monto_documento: parseFloat(factura.subtotal),
    monto_documento_dolar: parseFloat(factura.subtotal_dolar),
    tipo: 'FACT',
    pago: parseFloat(factura.subtotal),
    pago_dolar: parseFloat(factura.subtotal_dolar),
    tasa: tasa, //
    retencion: 0, //
    saldo_deudor: 0,
  }
};

const makeAbono = (factura: Factura, cliente: Cliente, { monto, monto_dolar, monto_restante, monto_restante_dolar }: any): Abono => {
  return {
    tercero: cliente.id,
    fecha_at: new Date().toISOString().substr(0, 10),
    monto,
    tipo: "FAC",
    monto_dolar,
    descripcion: "abono desde fuerza de ventas",
    monto_restante: "0",
    monto_restante_dolar: "0",
    pendiente: monto_restante,
    pendiente_dolar: monto_restante_dolar,
  }
}
const FechtTipoPago = async (Tenant: string) => {
  try {
    const response = await Fetch(`pagos/tipos`, { method: "GET", tenant: Tenant });
    return await JSON.parse(response.data).data
  } catch (e) {
    return 'hubo un error';
  }
}

const FechtTasa = async (Tenant: string) => {
  try {
    const response = await Fetch(`cambio`, { method: "GET", tenant: Tenant });
    return await JSON.parse(response.data).data
  } catch (e) {
    return 'hubo un error';
  }
}

const FechtBancos = async (Tenant: string) => {
  try {
    const response = await Fetch(`banco`, { method: "GET", tenant: Tenant });
    return await JSON.parse(response.data).data
  } catch (e) {
    return 'hubo un error';
  }
}
const createAndSendAbono = async (factura: Factura, cliente: Cliente, total: number, Tenant: string, tasa: string) => {
  try {
    const montos = {
      monto: parseFloat(tasa) * total,
      monto_dolar: total,
      monto_restante: total < parseFloat(factura.subtotal_dolar) ? parseFloat(factura.subtotal) - (parseFloat(tasa) * total) : 0,
      monto_restante_dolar: total < parseFloat(factura.subtotal_dolar) ? parseFloat(factura.subtotal_dolar) - (total) : 0
    }
    if (parseInt(factura.subtotal_dolar) === total) {
      const finalResponse = await Factura.UpdateFactura(factura.id, Tenant);
      return
    } if (parseFloat(factura.subtotal_dolar) > total) {
      const newAbono = { data: makeAbono(factura, cliente, montos), data1: [] };
      const responseAbono = await enviar(Tenant, newAbono, "abono");
    } if (parseFloat(factura.subtotal_dolar) < total) {
      const newAbono = { data: makeAbono(factura, cliente, montos), data1: [] };
      const responseAbono = await enviar(Tenant, newAbono, "abono");
      const finalResponse = await Factura.UpdateFactura(factura.id, Tenant);
    }
  } catch (e) {
    console.log(e);
  }
}
const Pagar = async (Tenant: string, data: Array<enviarInpustValues>, factura: Factura, cliente: Cliente, tasa: any, Abono: ParameterAbono) => {
  try {

    data.map((async (current) => {
      const tipoNombre = current.adm_tipo_pago_id.split(
        '_',
      )[0] as pago;
      const tipoId = current.adm_tipo_pago_id.split('_')[1];
      const bancoId = current?.banco_id ? current?.banco_id.split('_')[1] : 0;
      const isBanco =
        tipoNombre === 'TRANSFERENCIA' ||
        tipoNombre === 'TARJETA DE DEBITO' ||
        tipoNombre === 'TARJETA DE CREDITO';
      const movimiento = { data: isBanco ? makeMovBanco(tipoId, bancoId, current, factura, cliente) : makeMovCaja(tipoId, bancoId, current, factura, cliente) };
      const route = tipos[tipoNombre];
      const response = await enviar(Tenant, movimiento, route);
    }));


    const cobranza = { data: makeCobranza(factura, cliente, tasa) };
    const result = await enviar(Tenant, cobranza, 'cobranza');
    /* if (Abono.isAbono) {
       createAndSendAbono(factura, cliente, Abono.total, Tenant,tasa)
     }*/
    // else {
    const finalResponse = await Factura.UpdateFactura(factura.id, Tenant);
    // };
    console.log(finalResponse);
  } catch (error) {
    console.log(error);
    return null;
  }

}

const enviar = async (Tenant: string, data: unknown, model: string) => {
  try {
    const toString = JSON.stringify(data);
    const response = await Fetch(`${model}`, { method: "POST", tenant: Tenant }, toString);

    return await JSON.parse(response.data).data
  } catch (e) {
    return 'hubo un error';
  }
}

export default { FechtTipoPago, Pagar, FechtTasa, FechtBancos };