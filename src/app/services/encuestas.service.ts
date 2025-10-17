import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor() { }

      async insertarEncuesta(encuesta: any) {
    const { data, error } = await supabase
      .from('encuesta')
      .insert([
        {
          nombre_apellido: encuesta.nombre_apellido,
          edad: encuesta.edad,
          telefono: encuesta.telefono,
        }
      ])
      .select('id')
      .single();

    if (error) throw error;
    return data; 
  }

 
  async insertarRespuestas(idEncuesta: number, respuestas: any[]) {
    const { error } = await supabase
      .from('respuestas_encuesta')
      .insert(
        respuestas.map(r => ({
          id_encuesta: idEncuesta,
          pregunta: r.pregunta,
          tipo_control: r.tipo_control,
          respuesta: r.respuesta
        }))
      );

    if (error) throw error;
  }

  async obtenerEncuestas() {
    const { data, error } = await supabase.from('encuesta').select('*');
    if (error) throw error;
    return data;
  }
}
