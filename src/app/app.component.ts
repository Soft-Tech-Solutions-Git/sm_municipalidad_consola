import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sm_municipalidad_consola';

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    const homeRoutes: string[] = ['/home', '/ministerios', '/noticias', '/ambiente', '/turismo'];
    return homeRoutes.includes(this.router.url);
  }
}
