import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BotaoConfirmacao } from '../../botao-confirmacao/botao-confirmacao';
import { BotaoCancelar } from '../../botao-cancelar/botao-cancelar';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SocioService } from '../../../core/services/socio.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastraTagForm } from '../../../core/types/CadastraTagForm';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-altera-tag',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    BotaoConfirmacao,
    BotaoCancelar,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './altera-tag.html',
  styleUrl: './altera-tag.css'
})
export class AlteraTag {

  private data = inject(MAT_DIALOG_DATA);
  private service = inject(SocioService);
  private dialog = inject(MatDialogRef<AlteraTag>);
  private toastr = inject(ToastrService);

  cadastraTagForm: CadastraTagForm = {
    pessoaId: 0,
    tag: ''
  };

  form = new FormGroup({
    tag: new FormControl('', [Validators.required])
  });

  cadastraTag(): void {
    if (this.form.invalid) {
      this.toastr.error("Preencha o campo corretamente!");
      return;
    }
    this.cadastraTagForm = this.form.value as unknown as CadastraTagForm;
    this.cadastraTagForm.pessoaId = this.data.id;
    this.service.cadastrarTag(this.cadastraTagForm).subscribe({
      next: () => {
        this.toastr.success("Tag cadastrada com sucesso!");
        this.dialog.close(true);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Erro ao cadastrar tag!");
      }
    });
  }

  cancelar(): void {
    this.dialog.close(false);
  }
}
