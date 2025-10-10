import { Component, inject, OnInit } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SocioResponse } from '../../core/types/SocioResponse';
import { SocioService } from '../../core/services/socio.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AlteraTag } from '../../shared/pessoas/altera-tag/altera-tag';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-socios',
  imports: [
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './listar-socios.html',
  styleUrl: './listar-socios.css'
})
export class ListarSocios implements OnInit {

  private service = inject(SocioService)
  private dialog = inject(MatDialog)
  private toastr = inject(ToastrService);
  private router = inject(Router)


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
        this.toastr.error('Erro a buscar os sócios')
      }
    })
  }

  deletar(id: number): void {
    this.service.deletar(id).subscribe({
      next: () => {
        this.toastr.success('Sócio deletado com sucesso')
        this.buscarSocios()
      },
      error: (err) => {
        this.toastr.error('Erro ao deletar sócio')
      }
    })
  }

  abrirDialogAlteraTag(id: number): void {
    this.dialog.open(AlteraTag, { data: { id: id } });
  }

  editarSocio(id: number): void {
    // Navegar para a página de edição do sócio com o ID fornecido
    this.router.navigate(['/editar-socios', id]);
  }
}
