import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,       // <- clave
  imports: [RouterModule] // necesario si usas routerLink
})
export class HeaderComponent {
  authenticated = false;

  logout() {
    localStorage.removeItem('token');
    this.authenticated = false;
  }
}
