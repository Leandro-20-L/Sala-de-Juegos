import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  registerForm!: FormGroup;


  constructor(private authService: AuthService, private router: Router,private fb : FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
        
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsIguales });
  }
  
  private passwordsIguales(form: FormGroup) {
  const pass = form.get('password')?.value;
  const confirm = form.get('confirmPassword')?.value;
  return pass === confirm ? null : { passwordsMismatch: true };
}

  async onRegister() {
    
   if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Revisa los campos antes de continuar'
      });
      return;
    }
   
    const { email, password } = this.registerForm.value;
    const { data, error } = await this.authService.signUp(email, password);
    
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
        text: `Bienvenido ${this.email}`,
        confirmButtonColor: '#4dd0e1'
      });
      this.router.navigate(['/home']);
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
