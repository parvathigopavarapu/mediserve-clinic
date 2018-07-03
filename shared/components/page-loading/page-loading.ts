import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { NgIfContext } from '@angular/common';


@Component({
  selector: 'page-loading',
  templateUrl: 'page-loading.html'
})

export class LoadingPage {

  @ViewChild('template')
  private template: TemplateRef<any>;
 @Input('center') center:any;
  constructor(protected navCtrl: NavController, public app: App) {
  }


}