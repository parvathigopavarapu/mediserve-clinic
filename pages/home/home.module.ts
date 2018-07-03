import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { home } from "./home";
import { ComponentsModule } from '../../shared/components/components.module';

@NgModule({
  declarations: [
    home
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(home)
  ],
  exports: [
    home
  ]
})

export class homeModule {
}