import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule} from '@angular/router';

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

}
