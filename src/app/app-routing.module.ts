import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/routes/home/home.component';
import { MinisteriosComponent } from './components/routes/ministerios/ministerios.component';
import { NoticiasComponent } from './components/routes/noticias/noticias.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'ministerios',
    component: MinisteriosComponent,
  },
  {
    path: 'noticias',
    component: NoticiasComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
