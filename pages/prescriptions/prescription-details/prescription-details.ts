import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ApiProvider, ClinicPatientPrescriptionService, ClinicPatientAppointmentService, ClinicResponse } from 'mediserve-services/lib';
import { BasePage } from '../../base/BasePage';
import { PrescriptionResponse } from 'mediserve-services/lib/api/models/prescription-response';
import { Observable } from 'rxjs/Observable';
import { AppointmentResponse } from 'mediserve-services/lib/api/models/appointment-response';

@IonicPage({
  segment: 'prescription-details/:prescriptionId',
  defaultHistory: ['prescriptionList']
})

@Component({
  selector: 'page-prescription-details',
  templateUrl: 'prescription-details.html'
})

export class prescriptionDetails extends BasePage {

  business: Observable<ClinicResponse>;
  prescriptionItemId: any;
  appointment: Observable<AppointmentResponse>;
  prescription: Observable<PrescriptionResponse>;

  title: any = "Prescription Details";
  show = "false"
  show1 = "true";

  input: ClinicPatientPrescriptionService.ReadParams;
  params: ClinicPatientAppointmentService.ReadParams;


  constructor(
    protected navCtrl: NavController,
    public navParam: NavParams,

    protected svcsCtrl: ApiProvider) {
    super(navCtrl, navParam, svcsCtrl);

    this.input = {
      prescriptionId: this.svcsCtrl.homeService.getItem('prescriptionId'),
      clinicId: this.svcsCtrl.homeService.getItem('clinicId')
    }
  }

  ionViewWillEnter() {

    this.prescription = this.svcsCtrl.clinicPatientPrescriptionService.read(this.input);

    this.business = this.svcsCtrl.clinicBusinessService.read(this.input.clinicId);

    this.params = {
      appointmentId: this.svcsCtrl.homeService.getItem('appointmentId'),
      clinicId: this.svcsCtrl.homeService.getItem('clinicId')
    }

    this.prescription = this.svcsCtrl.clinicPatientPrescriptionService.read(this.input);
    this.business = this.svcsCtrl.clinicBusinessService.read(this.input.clinicId);
    this.appointment = this.svcsCtrl.clinicPatientAppointmentService.read(this.params);
  }

  edit(id) {
    this.prescriptionItemId = this.svcsCtrl.homeService.setItem("prescriptionItemId", id)
    this.navCtrl.push('prescriptionDrugEdit')
  }

  editItem() {
    this.navCtrl.push('prescriptionItemEdit')
  }
}