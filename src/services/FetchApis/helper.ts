import Fetch from "services/fecth"


export const enviar = async (Tenant: string, data: unknown, model: string, method:"GET"|"POST"="GET") => {
  try {
    const toString = JSON.stringify(data || "");
    const response = await Fetch(`${model}`, { method, tenant: Tenant }, toString);
    return await JSON.parse(response.data).data
  } catch (e) {
    return e + '  hubo un error';
  }
}
