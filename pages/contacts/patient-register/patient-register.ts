import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ApiProvider, ClinicResponse, ClinicPatientService, FamilyMember, PatientResponse } from 'mediserve-services/lib';
import { BasePage } from '../../base/BasePage';
import { Observable } from 'rxjs/Observable';

@IonicPage()

@Component({
    selector: 'page-patient-register',
    templateUrl: 'patient-register.html'
})

export class patientRegister extends BasePage {
   
    patient: Observable<PatientResponse>;
    selectedMember: Observable<FamilyMember[]>;
    business: Observable<ClinicResponse>;
    input: ClinicPatientService.ReadParams;
    
    constructor(public navCtrl: NavController,
        public Params: NavParams,
        public svcsCtrl: ApiProvider,
    ) {
        super(navCtrl, Params, svcsCtrl)
        this.title = "Member Registration";
        
        this.input = {
            patientId: this.Params.get('clinicPatientId'),
            clinicId: this.svcsCtrl.homeService.getItem('clinicId')
        }
    }

    ionViewWillEnter() {
        this.business = this.svcsCtrl.clinicBusinessService.read(this.svcsCtrl.homeService.getItem('clinicId'))
        this.patient = this.svcsCtrl.clinicPatientService.read(this.input)
    }

    patientInformation(clinicPatientId) {
        this.navCtrl.push('patientInformation', { clinicPatientId})
    }
}