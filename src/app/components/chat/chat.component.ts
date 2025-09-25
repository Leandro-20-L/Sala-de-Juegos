import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  
  mensajes$!: Observable<any[]>;
  nuevoMensaje = '';
  userId: string | null = null;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {
    this.mensajes$ = this.chatService.mensajes$;
    this.authService.user$.subscribe((u) => {
      this.userId = u?.id ?? null;
    });
  }

  enviar() {
    if (this.nuevoMensaje.trim() && this.userId) {
      this.chatService.enviarMensaje(this.userId, this.nuevoMensaje);
      this.nuevoMensaje = '';
    }
  }
}
