import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule], // ReactiveFormsModule necesario
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
  }

  Submit(): void {
    if (this.form.valid) {
      this.http.post('http://localhost:8000/api/register', this.form.getRawValue())
        .subscribe({
          next: () => this.router.navigate(['/login']),
          error: err => console.error('Error al registrar', err)
        });
    }
  }
}