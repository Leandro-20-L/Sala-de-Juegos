import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  
  mensajes$!: Observable<any[]>;
  userId: string | null = null;
  userEmail: string | null = null;
  chatForm!: FormGroup;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {

     
    this.chatForm = this.fb.group({
      mensaje: ['', [Validators.required, Validators.maxLength(200)]]
    });
    this.mensajes$ = this.chatService.mensajes$;
    this.authService.user$.subscribe((u) => {
      this.userId = u?.id ?? null;
      this.userEmail = u?.email ?? null;
    });
    //aca dentro del contruct se suscribe al observable user$ y obtiene los datos de session 
  }

  enviar() {
     if (this.chatForm.invalid || !this.userId || !this.userEmail) return;

    const contenido = this.chatForm.value.mensaje;
    this.chatService.enviarMensaje(this.userId,this.userEmail, contenido);
    this.chatForm.reset();
  }
}
