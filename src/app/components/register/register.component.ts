import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



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


  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    
    if (this.password !== this.confirmPassword) {
      Swal.fire({
      icon: 'warning',
      title: 'Contraseñas no coinciden',
      text: 'Por favor, verifica que ambas contraseñas sean iguales',
      confirmButtonColor: '#1e3a5f'
    });
      return;
    }
  
    const { data, error, } = await this.authService.signUp(this.email, this.password);

    console.log("DATA:")
    console.log(data);
  
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: this.traducirErrorSupabase(error),
        confirmButtonColor: '#e63946'
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: '¡Cuenta creada!',
        text: 'Revisa tu correo electrónico para confirmar la cuenta',
        confirmButtonColor: '#4dd0e1'
      });
      this.router.navigate(["/home"]);
    }
  }

  private traducirErrorSupabase(error: any): string {
  if (!error || !error.message) return 'Ha ocurrido un error inesperado.';

  switch (true) {
    case error.message.includes("User already registered"):
      return "El correo ya está registrado.";
    case error.message.includes("Password should be at least 6 characters"):
      return "La contraseña debe tener al menos 6 caracteres.";
    case error.message.includes("Invalid login credentials"):
      return "Correo o contraseña incorrectos.";
    default:
      return "Error en la autenticación. Intenta nuevamente.";
  }
}

}
