import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { BotaoConfirmacao } from './../../shared/botao-confirmacao/botao-confirmacao';
import { AuthService } from './../../core/services/AuthService';
import { LoginForm } from './../../core/types/LoginForm';

@Component({
  selector: 'app-login',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,

    BotaoConfirmacao,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private AuthService = inject(AuthService);
  private toastr = inject(ToastrService);

  loginForm: LoginForm = {
    email: '',
    senha: ''
  };

  form = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      senha: new FormControl('', [Validators.required])
    }
  );

  login(): void {
    this.loginForm = this.form.value as unknown as LoginForm;
    this.AuthService.autenticar(this.loginForm).subscribe({
      next: () => {
        this.toastr.success('Login bem-sucedido');
      },
      error: () => {
        this.toastr.error('Erro ao fazer login');
      }
    });
  }
}
