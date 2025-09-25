import { Routes } from '@angular/router';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { MortalClickComponent } from './components/mortal-click/mortal-click.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';

export const routes: Routes = [
    {
        path: 'juegos',
        children: [
           { path: 'mayor-menor', component: MayorMenorComponent },
            { path: 'preguntados', component: PreguntadosComponent },
            { path: 'mortal-click', component: MortalClickComponent },
            { path: 'ahorcado', component: AhorcadoComponent },
        ]
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
