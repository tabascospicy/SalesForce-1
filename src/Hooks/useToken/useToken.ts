import React from "react";
import jwt from "jsonwebtoken";
import Global from "services/variables_globales";
import reactotron from "reactotron-react-native";
export const useToken = () => {
  const getTenantId = (encripted:string)=>{
    return  jwt.verify(encripted,Global.public_key,(err,keys)=>{
      if(err){
        reactotron.log && reactotron.log(err);
        return ""
      }
      return keys
    });
  }
  return {getTenantId};
}

