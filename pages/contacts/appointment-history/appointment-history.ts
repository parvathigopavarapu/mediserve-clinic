import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ApiProvider, ClinicPatientAppointmentService,AppointmentResponse } from 'mediserve-services';
import { BasePage } from '../../base/BasePage';
import { Observable } from 'rxjs/Observable';

@IonicPage({
    segment: 'patient/:clinicPatientId/appointment-history'
})
@Component({
    selector: 'page-appointment-history',
    templateUrl: 'appointment-history.html'
})

export class AppointmentHistory extends BasePage {

    clinicPatientId: any;
    input:  ClinicPatientAppointmentService.ListByPatientParams;
    appointments:Observable<Array<AppointmentResponse>>
    
    constructor(  protected navCtrl: NavController,
        protected navParams: NavParams,
        protected svcsCtrl: ApiProvider) {
        super(navCtrl, navParams, svcsCtrl);
        this.title = "Appointment History"
        this.clinicPatientId = this.navParams.get('clinicPatientId')
    }

    ionViewWillEnter() {
        this.input = {
            clinicId: this.svcsCtrl.homeService.getItem('clinicId'),
            patientId: this.navParams.get('clinicPatientId')
        }
        this.appointments = this.svcsCtrl.clinicPatientAppointmentService.listByPatient(this.input)
    }

    viewAppointment(appointmentId, clinicPatientId) {
        this.svcsCtrl.homeService.setItem("appointmentId",{appointmentId})
        this.navCtrl.push('appointmentDetails')
    }


}