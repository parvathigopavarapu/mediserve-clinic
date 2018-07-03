import { Component } from '@angular/core';

import { NavController, IonicPage } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ApiProvider, ClinicTemplate } from "mediserve-services";
import { BasePage } from '../../../../pages/base/BasePage';

@IonicPage()
@Component({
    selector: 'page-ebusiness-registration-step1',
    templateUrl: 'ebusiness-registration-step1.html'
})
export class ebusinessRegistrationStep1 extends BasePage {

    business: ClinicTemplate;
    constructor(
          protected navCtrl: NavController,
        protected navParams: NavParams,
        protected svcsCtrl: ApiProvider
    ) {
        super(navCtrl, navParams, svcsCtrl);
        this.title = "Business Details"
    }

    ionViewWillEnter() {
        console.log("get Business")
    }


    next() {
        this.svcsCtrl.clinicBusinessService.setItem('business',this.business).then((data) => {
                    this.gotoRegistrationStep2();
                });
        }
}
