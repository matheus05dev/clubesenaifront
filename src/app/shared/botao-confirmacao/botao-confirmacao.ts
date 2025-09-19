import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-botao-confirmacao',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './botao-confirmacao.html',
  styleUrl: './botao-confirmacao.css'
})
export class BotaoConfirmacao {

  @Input() texto: string = 'Confirmar';
  @Input() icone: string = 'check';
  @Output() botaoAcionado = new EventEmitter<void>();
}
