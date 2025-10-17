import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterLink, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router :Router, private snackBar: MatSnackBar){

  }
  
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  
  async login(){
    
    try {
      await this.authService.logIn(this.email,this.password);
      this.snackBar.open(`Bienvenido ${this.email}`, 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });

      this.router.navigate(["/home"]);
    } catch (error: any) {
       this.snackBar.open(
        error.message || 'Correo o contraseña incorrectos',
        'Cerrar',
        {
          duration: 3500,
          panelClass: ['snackbar-error']
        }
      );
    }
    
  }

  llenarUsers(email:string,password:string){
    this.email= email; 
    this.password = password;
  }
}
