import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-botao-editar',
  imports: [
    MatIcon,
    MatButtonModule
    ],
  templateUrl: './botao-editar.html',
  styleUrl: './botao-editar.css'
})
export class BotaoEditar {
  @Input() texto: string = 'Editar';
  @Input() icone: string = 'edit';
  @Output() botaoAcionado = new EventEmitter<void>();
}
