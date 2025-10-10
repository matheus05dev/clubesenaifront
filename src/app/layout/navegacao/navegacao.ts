import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule} from '@angular/router';
import { AuthService } from '../../core/services/AuthService';

@Component({
  selector: 'app-navegacao',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
],
  templateUrl: './navegacao.html',
  styleUrl: './navegacao.css'
})
export class Navegacao {

  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
