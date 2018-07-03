import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { ApiProvider, ClinicPatientAppointmentService, ClinicUserResponse, AppointmentResponse } from 'mediserve-services/lib';
import { BasePage } from '../../base/BasePage';
import { Observable } from 'rxjs/Observable';

@IonicPage({
  segment: 'appointment-edit/:appointmentId',
  defaultHistory: ['appointmentList']
})

@Component({
  selector: 'page-appointment-edit',
  templateUrl: 'appointment-edit.html'
})

export class appointmentEdit extends BasePage {

  user: Observable<ClinicUserResponse[]>;
  appointment: Observable<AppointmentResponse>;
  title = "Edit Appointment"
  timeSlots: any = [];
  dateTime = new Date();
  timeStr = '';
  time: any;
  input: ClinicPatientAppointmentService.ReadParams;
  update: ClinicPatientAppointmentService.UpdateParams;

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected svcsCtrl: ApiProvider

  ) {
    super(navCtrl, navParams, svcsCtrl);
  }

  ionViewWillEnter() {
    this.initialize();
    this.readAppointment()
    this.onChange("10:00-18:00")
  }
  ionViewDidEnter() {
    setTimeout(() => {
      this.listUser();
    }, 1000);
  }

  initialize() {
    this.input = {
      appointmentId: this.svcsCtrl.homeService.getItem('appointmentId'),
      clinicId: this.svcsCtrl.homeService.getItem('clinicId')
    }
  }

  readAppointment() {
    this.appointment = this.svcsCtrl.clinicPatientAppointmentService.read(this.input);
  }

  async listUser() {
    this.user = this.svcsCtrl.clinicUserService.list(this.input.clinicId);
  }

  onChange(slot) {
    var startHour = slot.substring(0, 2)
    startHour = parseInt(startHour)
    var endHour = slot.substring(6, 8)
    endHour = parseInt(endHour);
    var interval = 15;
    if (!startHour) {
      endHour = 9;
    }
    if (!endHour) {
      endHour = 20;
    }
    this.timeSlots = [];
    this.dateTime.setHours(startHour, 0, 0, 0);
    while (new Date(this.dateTime.getTime()).getHours() < endHour) {
      this.timeStr = this.dateTime.getHours() + ':' + this.dateTime.getMinutes();
      // this.timeStrr += '-';
      this.timeSlots.push(this.timeStr);
      this.dateTime = new Date(this.dateTime.getTime() + interval * 60000);
      // this.timeStrr = this.dateTimeq.getHours() + ':' + this.dateTimeq.getMinutes();
    }
    return this.timeSlots;
  }

  getAppointmentTime(appointmentTime) {
    this.time = appointmentTime;
  }

  UpdateAppointment(appointment) {
    console.log("appoint edit" + JSON.stringify(appointment))
    this.update = {
      body: {
        appointmentDate: appointment.appointmentDate,
        appointmentTime: this.time,
        symtoms: appointment.symtoms
      },
      clinicId: this.input.clinicId,
      appointmentId: this.input.appointmentId
    }

    this.svcsCtrl.clinicPatientAppointmentService.update(this.update).subscribe((response) => {

      this.navCtrl.push('appointmentList')
    }, (err) => {
      console.log(err)
    })
  }

} 