import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = await auth.getUser();

  if (user) {
    return true; 
  } else {
    
    Swal.fire({
      icon: 'warning',
      title: 'Acceso restringido',
      text: 'Debes iniciar sesión para jugar.',
      confirmButtonText: 'Ir al login'
    });
    return router.createUrlTree(['/login']);
  }
};
