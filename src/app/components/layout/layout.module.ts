import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { RoutesModule } from '../routes/routes.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    RoutesModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
  ],
  exports: [FooterComponent, HeaderComponent],
})
export class LayoutModule {}
