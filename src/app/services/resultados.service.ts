import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  constructor(private authService: AuthService) { }

  async guardarResultado(puntaje: number, victoria: boolean, juego: string) {
    const userId = await this.authService.getUserUid(); 
    if (!userId) throw new Error('Usuario no autenticado');

    const { error } = await supabase
      .from('resultados')
      .insert([
        {
          user_id: userId,
          juego: juego,
          puntaje: puntaje,
          resultado: victoria ? 'Ganó' : 'Perdió'
        }
      ]);

    if (error) throw error;
  }

  async obtenerResultados() {
    const { data, error } = await supabase
      .from('v_resultados') 
      .select('*')
      .order('fecha_juego', { ascending: false });

    if (error) throw error;
    return data;
  }

  async obtenerResultadosUsuario() {
    const user = await this.authService.getUser();
    if (!user) throw new Error('Usuario no autenticado');

    const { data, error } = await supabase
      .from('v_resultados')
      .select('*')
      .eq('email', user.email) 
      .order('fecha_juego', { ascending: false });

    if (error) throw error;
    return data;
  }
}
