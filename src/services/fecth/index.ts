import Global from "../variables_globales"
import RNFechtBlob from "rn-fetch-blob";
type URL = "usuario" | "empresa" | "clientes";

type conf = {
  method:"GET" | "POST" | "DELETE",
  tenant:string
}
const Request = (url:string,Co :conf ,data:any=null,img=false) => {
  return RNFechtBlob.config({trusty:true}).fetch(Co.method,img ? `${Global.http}://${Global.imagen}/${url}/` : `${Global.http}://somossistemas.com/api/${url}`, {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-control': Global.header,
      'tenant-id': Co.tenant,
      'Keep-Alive': "timeout=2000"
    },data
  )
} 
export const Login = (url:string,data:string="",Tenant:string)=>{
    return RNFechtBlob.config({trusty:true}).fetch("POST",`https://somossistemas.com/auth/${url}`, {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-control': Global.header,
        'tenant-id':Tenant || Global.Base,
        'Keep-Alive': "timeout=2000"
      },data
    )
}
export default Request