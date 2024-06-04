import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { MinisteriosComponent } from './ministerios/ministerios.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, NoticiasComponent, MinisteriosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  exports: [HomeComponent, NoticiasComponent, MinisteriosComponent],
})
export class RoutesModule {}
