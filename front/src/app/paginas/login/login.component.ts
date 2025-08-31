import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // necesario para routerLink

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],  // <- aquí importamos RouterModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // <- plural
})
export class LoginComponent {}
