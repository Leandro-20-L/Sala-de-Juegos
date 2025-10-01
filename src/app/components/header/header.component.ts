import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  user$!: Observable<User | null>;

  constructor(private auth: AuthService, private router: Router){
    this.user$ = this.auth.user$;
  }
  
  async logout() {
    await this.auth.logOut();
    this.router.navigate(['/home'])
  }
}
