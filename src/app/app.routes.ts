import { Routes } from '@angular/router';
import { PreguntadosComponent } from './components/juegos/preguntados/preguntados.component';
import { MayorMenorComponent } from './components/juegos/mayor-menor/mayor-menor.component';
import { MortalClickComponent } from './components/juegos/mortal-click/mortal-click.component';
import { AhorcadoComponent } from './components/juegos/ahorcado/ahorcado.component';

export const routes: Routes = [
     {
        path: 'juegos',
        loadChildren: () => import('./components/juegos/juegos.module').then(m => m.JuegosModule)
    },
    {
        path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'about', loadComponent: () => import('./components/quien-soy/quien-soy.component').then(m => m.QuienSoyComponent)
    },
    {
        path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'chat', loadComponent: () => import('./components/chat/chat.component').then(m => m.ChatComponent)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: '**', 
        redirectTo: 'home' 
    }
];
