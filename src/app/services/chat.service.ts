import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private mensajesSubject = new BehaviorSubject<any[]>([]);
  mensajes$ = this.mensajesSubject.asObservable();

  constructor() {
    
    this.cargarMensajes();
    this.subscribirMensajes();
  }

  private async cargarMensajes() {
    const { data, error } = await supabase
      .from('mensajes')
      .select('id, contenido, creado_en, user_id')
      .order('creado_en', { ascending: true });

    if (!error && data) {
      this.mensajesSubject.next(data);
    }
  }

   async enviarMensaje(userId: string, contenido: string) {
    const { error } = await supabase
      .from('mensajes')
      .insert([{ user_id: userId, contenido }]);
    if (error) console.error(error);
  }

  private subscribirMensajes() {
    supabase
      .channel('mensajes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mensajes' },
        (payload) => {
          const mensajes = [...this.mensajesSubject.value, payload.new];
          this.mensajesSubject.next(mensajes);
        }
      )
      .subscribe();
  }

}
