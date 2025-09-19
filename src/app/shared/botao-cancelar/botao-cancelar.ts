import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-botao-cancelar',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './botao-cancelar.html',
  styleUrl: './botao-cancelar.css'
})
export class BotaoCancelar {
  @Input() texto: string = 'Cancelar';
  @Input() icone: string = 'close';
  @Output() botaoAcionado = new EventEmitter<void>();
}
