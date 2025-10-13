import { Routes } from '@angular/router';


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
