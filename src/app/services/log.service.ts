import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  async RegistraLog(idUsuario:string , accion: string, usuario: string){
    const {data, error} = await supabase.from("user_logs").insert([{
      user_id: idUsuario,
       email: usuario,
      accion:accion,
     
   
    }]);

    if (error) {
      console.error("Error registrando log:", error.message);
    } else {
      console.log("Log registrado:", data);
    }
  }
}
