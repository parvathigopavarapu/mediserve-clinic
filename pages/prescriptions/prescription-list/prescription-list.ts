import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, InfiniteScroll } from 'ionic-angular';
import { ApiProvider, ClinicResponse, UserTemplate} from 'mediserve-services/lib';
import { BasePage } from '../../base/BasePage';
import { Observable } from 'rxjs/Observable';
import { PrescriptionResponse } from 'mediserve-services/lib/api/models/prescription-response';
 
@IonicPage({
    segment: 'prescription-list'
})

@Component({
    selector: 'page-prescription-list',
    templateUrl: 'prescription-list.html'
})

export class prescriptionList extends BasePage {

    loading:boolean = false;
    profile: Observable<UserTemplate>;
    business: Observable<ClinicResponse>;
    prescriptions:any//Observable<PrescriptionResponse[]>
    prescriptionId: any;
    start: number = 7;
    clinicId = this.svcsCtrl.homeService.getItem('clinicId');
    constructor(
          protected navCtrl: NavController,
        protected navParams: NavParams,
        protected svcsCtrl: ApiProvider

    ) {
        super(navCtrl, navParams, svcsCtrl);
        this.title = "Recent Prescriptions";

        this.profile = this.svcsCtrl.profileService.read();
        this.business = this.svcsCtrl.clinicBusinessService.read(this.clinicId)
        this.prescriptions = this.svcsCtrl.clinicPatientPrescriptionService.list(this.clinicId);
    }

   ionViewWillEnter() {
        
      
    }

    refresh(refresher) {
        this.svcsCtrl.homeService.reload(this.prescriptions, refresher);
    }

    viewprescription(prescriptionId) {
        this.prescriptionId = this.svcsCtrl.homeService.setItem('prescriptionId', prescriptionId)
        this.navCtrl.push('prescriptionDetails')
    }

    writePrescription() {
        this.navCtrl.push('contactSearch', { data: 'createPrescription' })
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');
         this.start +=2;
        console.log('Async operation has ended');
        infiniteScroll.complete();
        }
      
}