import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { MortalClickComponent } from './mortal-click/mortal-click.component';

const routes: Routes = [
  { path: 'mayor-menor', component: MayorMenorComponent },
  { path: 'preguntados', component: PreguntadosComponent },
  { path: 'mortal-click', component: MortalClickComponent },
  { path: 'ahorcado', component: AhorcadoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule {}
