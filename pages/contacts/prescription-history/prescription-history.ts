import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { ApiProvider,PrescriptionResponse,ClinicPatientPrescriptionService } from 'mediserve-services/lib';
import { BasePage } from '../../base/BasePage';
import { Observable } from 'rxjs/Observable';

@IonicPage({
    segment: 'patient/:clinicPatientId/prescription-history',
    defaultHistory: ['patientInformation']
})

@Component({
    selector: 'page-prescription-history',
    templateUrl: 'prescription-history.html'
})

export class PrescriptionHistory extends BasePage {

   input:ClinicPatientPrescriptionService.ListByPatientParams;
   prescriptions : Observable<Array<PrescriptionResponse>>;

    constructor(
          protected navCtrl: NavController,
        protected navParams: NavParams,
        protected svcsCtrl: ApiProvider
    ) {
        super(navCtrl, navParams, svcsCtrl);
        this.title = "Prescription History"
        
        this.input = {
        patientId: this.navParams.get('clinicPatientId'),
        clinicId: this.svcsCtrl.homeService.getItem('clinicId')
        }
    }

    ionViewWillEnter() {
        this.prescriptions = this.svcsCtrl.clinicPatientPrescriptionService.listByPatient(this.input)
    }

    viewprescription(prescriptionId) {
        this.navCtrl.push('prescriptionDetails', { prescriptionId })
    }


}