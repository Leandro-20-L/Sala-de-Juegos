import { Component, OnInit } from '@angular/core';
import { ResultadosService } from '../../services/resultados.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.scss'
})
export class ResultadosComponent implements OnInit {
  resultados: any[] = [];
  cargando = true;
  soloUsuario = false;
  emailUsuario: string | null = null;

  juegos = [
  { nombre: 'Mortal Click', clase: 'mortal' },
  { nombre: 'Preguntados', clase: 'preguntados' },
  { nombre: 'Ahorcado', clase: 'ahorcado' },
  { nombre: 'Mayor o Menor', clase: 'mayor' }
];

  constructor(
    private resultadosService: ResultadosService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.cargarResultados();
  }

  filtrarPorJuego(nombreJuego: string) {
  return this.resultados.filter(r => r.juego === nombreJuego);
  }

  async cargarResultados() {
    this.cargando = true;

    if (this.soloUsuario) {
      const user = await this.authService.getUser();
      this.emailUsuario = user?.email || null;
      this.resultados = await this.resultadosService.obtenerResultadosUsuario();
    } else {
      this.resultados = await this.resultadosService.obtenerResultados();
    }

    this.cargando = false;
  }

  async toggleVista() {
    this.soloUsuario = !this.soloUsuario;
    await this.cargarResultados();
  }

  obtenerClaseResultado(resultado: string) {
    if (resultado === 'Ganó') return 'gano';
    if (resultado === 'Perdió') return 'perdio';
    return '';
  }
}
