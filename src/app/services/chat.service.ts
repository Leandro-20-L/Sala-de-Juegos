import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private mensajesSubject = new BehaviorSubject<any[]>([]);
  mensajes$ = this.mensajesSubject.asObservable();
  //aca este objeto mantiene en memmoria el listado de mensajes 

  constructor() {
    
    this.cargarMensajes();
    this.subscribirMensajes();
  }

  //aca se hace un SELECT y llena el Behavior 
  private async cargarMensajes() {
    const { data, error } = await supabase
      .from('mensajes')
      .select('id, contenido, creado_en, user_id,email')
      .order('creado_en', { ascending: true });

    if (!error && data) {
      this.mensajesSubject.next(data);
    }
  }

  // y la diferencia con este que hago el insert a la db pero no actualizo el Behavior 
   async enviarMensaje(userId: string,  email: string,contenido: string) {
    const { error } = await supabase
      .from('mensajes')
      .insert([{ user_id: userId,email, contenido }]);
    if (error) console.error(error);
  }

  //y este metod escucha el cambio en tiempo real y inserta los nuevos mensajes al behavior 
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
