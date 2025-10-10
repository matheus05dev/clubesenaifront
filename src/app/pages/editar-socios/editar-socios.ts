import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SocioService } from '../../core/services/socio.service';
import { BotaoConfirmacao } from '../../shared/botao-confirmacao/botao-confirmacao';
import { BotaoCancelar } from '../../shared/botao-cancelar/botao-cancelar';
import { EditarSocioForm } from '../../core/types/EditarSocioForm';
import { SocioResponse } from '../../core/types/SocioResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-socios',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, BotaoConfirmacao, BotaoCancelar],
  templateUrl: './editar-socios.html',
  styleUrl: './editar-socios.css'
})
export class EditarSocios implements OnInit {

  form: FormGroup;
  id: number;
  socio: SocioResponse | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socioService: SocioService,
    private toastr: ToastrService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    this.form = new FormGroup({
      matricula: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dataNascimento: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      rua: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      dataAssociacao: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadSocio();
  }

  private toDateInputString(value: any): string {
    if (!value) return '';
    try {
      const d = new Date(value);
      return d.toISOString().slice(0, 10);
    } catch {
      return '';
    }
  }

  loadSocio(): void {
    this.socioService.buscarPorId(this.id).subscribe({
      next: (s) => {
        this.socio = s;
        this.form.patchValue({
          matricula: s.matricula,
          nome: s.nome,
          email: s.email,
          dataNascimento: this.toDateInputString(s.dataNascimento),
          pais: s.endereco?.pais || '',
          estado: s.endereco?.estado || '',
          cidade: s.endereco?.cidade || '',
          rua: s.endereco?.rua || '',
          numero: s.endereco?.numero || '',
          dataAssociacao: this.toDateInputString(s.dataAssociacao)
        });
      },
      error: (err) => {
        // use toastr when available in DI - fallback to console
        try { this.toastr.error('Erro ao carregar sócio'); } catch { console.error('Erro ao carregar sócio', err); }
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const v = this.form.value;
      const editarForm: EditarSocioForm = {
        matricula: v.matricula,
        nome: v.nome,
        email: v.email,
        dataNascimento: new Date(v.dataNascimento),
        pais: v.pais,
        estado: v.estado,
        cidade: v.cidade,
        rua: v.rua,
        numero: v.numero,
        dataAssociacao: new Date(v.dataAssociacao)
      };

      this.socioService.editar(this.id, editarForm).subscribe({
        next: () => {
          try { this.toastr.success('Sócio atualizado com sucesso'); } catch {}
          this.router.navigate(['/listar-socios']);
        },
        error: (err) => {
          try { this.toastr.error('Erro ao atualizar sócio'); } catch {}
          console.error('Erro ao atualizar sócio:', err);
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/listar-socios']);
  }

}
