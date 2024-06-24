import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    miFormulario: FormGroup = this.fb.group({
        email: [, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),],],
        password: [, [Validators.required, Validators.minLength(6)]],
    });

    constructor(private fb: FormBuilder, private router: Router, private _authService: AuthService) { }

    campoEsValido(campo: string) {
        return (
            this.miFormulario.controls[campo].errors &&
            this.miFormulario.controls[campo].touched
        );
    }

    ingresar() {
        if (this.miFormulario.invalid)
            return
        const { email, password } = this.miFormulario.controls;
        this._authService.login(email.value, password.value).subscribe({
            next: (data) => {
                if (data.success === true) {
                    localStorage.setItem('usuario', JSON.stringify(email.value));
                    this.router.navigate(['/home'])
                }
            }
        })
    }
}
