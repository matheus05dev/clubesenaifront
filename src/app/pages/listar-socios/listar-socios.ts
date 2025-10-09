import { Component, inject, OnInit } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SocioResponse } from '../../core/types/SocioResponse';
import { SocioService } from '../../core/services/socio.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listar-socios',
  imports: [
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
],
  templateUrl: './listar-socios.html',
  styleUrl: './listar-socios.css'
})
export class ListarSocios implements OnInit {

  private service = inject(SocioService)

  displayedColumns: string[] = [
    'matricula',
    'nome',
    'email',
    'liberado',
    'statusAcesso',
    'acoes'
  ];

  dataSource = new MatTableDataSource<SocioResponse>([]);

  ngOnInit(): void {
    this.buscarSocios()
    }

  buscarSocios(): void {
    this.service.buscarTodos().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (err) => {
        alert('Erro a buscar os sócios')
      }
    })
  }

  deletar(id: number): void {
    this.service.deletar(id).subscribe({
      next: () => {
        alert('Sócio deletado com sucesso')
        this.buscarSocios()
      },
      error: (err) => {
        alert('Erro ao deletar sócio')
      }
    })
  }

}
