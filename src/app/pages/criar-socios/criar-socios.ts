import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from "@angular/forms";

import { BotaoConfirmacao } from '../../shared/botao-confirmacao/botao-confirmacao';
import { BotaoCancelar } from '../../shared/botao-cancelar/botao-cancelar';
import { CadastroSocioForm } from '../../core/types/CadastroSocioForm';
import { SocioService } from '../../core/services/socio.service';

@Component({
  selector: 'app-criar-socios',
  imports: [BotaoConfirmacao, BotaoCancelar, FormsModule, ReactiveFormsModule],
  templateUrl: './criar-socios.html',
  styleUrl: './criar-socios.css'
})

export class CriarSocios{

  cadastroSocioForm: CadastroSocioForm = {
    nome: '',
    email: '',
    dataNascimento: new Date(),
    pais: '',
    estado: '',
    cidade: '',
    rua: '',
    numero: '',
    dataAssociacao: new Date(),
    matricula: ''

  };

  form = new FormGroup(
    {
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      rua: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      dataAssociacao: new FormControl('', [Validators.required]),
      matricula: new FormControl('', [Validators.required])
    }
  );

  constructor(private socioService: SocioService) { }

  criarSocio(): void {
    this.cadastroSocioForm = this.form.value as unknown as CadastroSocioForm;
    this.socioService.cadastrar(this.cadastroSocioForm).subscribe({
      next: () => {
        alert('Sócio cadastrado com sucesso!');
        this.form.reset();
      },
      error: () => {
        alert('Erro ao cadastrar sócio. Por favor, tente novamente.');
      }
    });
  }

}
