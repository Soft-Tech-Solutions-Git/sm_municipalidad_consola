import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/routes/home/home.component';
import { MinisteriosComponent } from './components/routes/ministerios/ministerios.component';
import { NoticiasComponent } from './components/routes/noticias/noticias.component';
import { LoginComponent } from './components/routes/login/login.component';

import { AuthGuard } from './guards/auth.guard';
import { AmbienteComponent } from './components/routes/ambiente/ambiente.component';
import { TurismoComponent } from './components/routes/turismo/turismo.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ministerios',
    component: MinisteriosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'noticias',
    component: NoticiasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ambiente',
    component: AmbienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'turismo',
    component: TurismoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
