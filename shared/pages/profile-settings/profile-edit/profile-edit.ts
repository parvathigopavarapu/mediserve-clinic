import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { ApiProvider, UserTemplate } from "mediserve-services";
import { BasePage } from '../../../../pages/base/BasePage';
import { Observable } from 'rxjs/Observable';

@IonicPage({
    segment: 'profile-settings/profile-edit',
    defaultHistory: ['profileDetails']
})

@Component({
    selector: 'page-profile-edit',
    templateUrl: 'profile-edit.html'
})

export class profileEdit extends BasePage {


    profile: Observable<UserTemplate>;
    // profile: UserTemplate;
    tabIndex: string;

    constructor(
        protected navCtrl: NavController,
        protected navParams: NavParams,
        protected svcsCtrl: ApiProvider
    ) {
        super(navCtrl, navParams, svcsCtrl);
        this.title = "Edit Profile";
        this.tabIndex = "0";
    }

    ionViewDidLoad() {
        this.profile = this.svcsCtrl.profileService.read()
    }


    ionViewWillEnter() {
       
        let tabs = document.querySelectorAll('.tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map( key => {
                tabs[key].style.transform = 'translateY(56px)';
            });
        }
    }

    ionViewWillLeave() {
        let tabs = document.querySelectorAll('.tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map( key => {
                tabs[key].style.transform = 'translateY(0)';
            });
        }
    }

    update(profile) {

        this.svcsCtrl.profileService.update(profile).subscribe((response) => {          
            this.navCtrl.push("profileDetails").then(() => {
                const startIndex = this.navCtrl.getActive().index - 2;
                this.navCtrl.remove(startIndex, 2);
            });
        })
    }

    cancel() {
        this.navCtrl.pop();
    }

}