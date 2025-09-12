import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  message: string = '';

  constructor(private authService: AuthService) {}

  async onRegister() {
    this.message = '';
    if (this.password !== this.confirmPassword) {
      Swal.fire({
      icon: 'warning',
      title: 'Contraseñas no coinciden',
      text: 'Por favor, verifica que ambas contraseñas sean iguales',
      confirmButtonColor: '#1e3a5f'
    });
      return;
    }

    this.loading = true;
    const { data, error } = await this.authService.signUp(this.email, this.password);
    this.loading = false;

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: error.message,
        confirmButtonColor: '#e63946'
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: '¡Cuenta creada!',
        text: 'Revisa tu correo electrónico para confirmar la cuenta',
        confirmButtonColor: '#4dd0e1'
      });
    }
  }
}
