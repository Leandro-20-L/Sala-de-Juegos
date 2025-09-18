import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router :Router){

  }
  
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  message: string = '';
  async login(){
    
    try {
      await this.authService.logIn(this.email,this.password);
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: `Bienvenido ${this.email}`,
        confirmButtonColor: '#3085d6'
      })

      this.router.navigate(["/home"]);
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Credenciales inválidas',
        text: error.message || 'El correo o contraseña no son correctos',
        confirmButtonColor: '#3085d6'
      })
    }
    
  }

  llenarUsers(email:string,password:string){
    this.email= email; 
    this.password = password;
  }
}
