import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { prescriptionList } from "./prescription-list";
import { ComponentsModule } from '../../../shared/components/components.module';

@NgModule({
  declarations: [
    prescriptionList
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(prescriptionList)
  ],
  exports: [
    prescriptionList
  ]
})

export class prescriptionListModule {
}