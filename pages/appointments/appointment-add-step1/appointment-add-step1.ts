import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController, ModalController, ActionSheetController } from 'ionic-angular';
import { ApiProvider, ClinicUserResponse, AppointmentCreate, AppointmentResponse } from 'mediserve-services';
import { BasePage } from '../../base/BasePage';
import { Observable } from 'rxjs/Observable';

@IonicPage({
  segment: ':clinicPatientId/appointment-add-step1',
  defaultHistory: ['contactSelect']
})

@Component({
  selector: 'page-appointment-add-step1',
  templateUrl: 'appointment-add-step1.html'
})

export class appointmentAddStep1 extends BasePage {

  toast: any;
  appointmentList: AppointmentResponse[];
  user: Observable<ClinicUserResponse[]>;
  appointment: AppointmentCreate = {};
  appointmentList1: any = [];
  clinicId: any;
  appointmentdate: any;
  minDate: any;
  require: any = "true";

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected svcsCtrl: ApiProvider,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController, public actionSheet: ActionSheetController

  ) {
    super(navCtrl, navParams, svcsCtrl);
    this.title = "Create Appointment";
    this.appointment.symtoms = [];
    this.clinicId = this.svcsCtrl.homeService.getItem('clinicId');
    this.minDate = new Date().toISOString()
  }

  ionViewWillEnter() {
    this.user = this.svcsCtrl.clinicUserService.list(this.clinicId);
  }

  appointmentDate(date) {
    this.appointmentdate = date;
  }
  getavailableappointments() {
    this.svcsCtrl.clinicPatientAppointmentService.list(this.clinicId).subscribe((response) => {
      this.appointmentList = response;
      let appointmentList12 = this.appointmentList.filter(appointment => this.getDate(appointment.appointmentDate) == this.getDate(this.appointmentdate));

      for (let y in appointmentList12) {
        this.appointmentList1 = this.appointmentList1 || []
        this.appointmentList1.push(appointmentList12[y].appointmentTime)

      }
      this.presentToast('The follwing appointment timings are not available please choose another!... ', JSON.stringify(this.appointmentList1))
      this.appointmentList1 = null;


    })
  }

  getInputField() {

    let profileModal = this.modalCtrl.create('searchSymptom', { appointment: this.appointment });
    profileModal.present();
  }
  // let alert = this.actionSheet.create({
  // title: 'Add Symptom',
  // inputs: [
  //   {

  //     name: 'title',
  //     placeholder: 'Title',
  //     handler:(ionInput) =>{
  //       console.log('inhaandler'+ionInput)
  //     }
  //   },
  // ],
  // buttons: [
  //   {
  //     text: 'Cancel',
  //     handler: () => {

  //       console.log('Cancel clicked');
  //     }
  //   },
  //   {
  //     text: 'Save',
  //     handler: (value) => {
  //       for (let i = 0; i < this.list.length; i++) {
  //         if (this.list[i] == value.title) {
  //           this.appointment.symtoms.push(value.title)
  //         }
  //       }

  //     }
  //   }
  // ]
  // });

  // alert.present();
  // }



  removeSymptom(index) {
    this.appointment.symtoms.splice(index, 1)
  }

  appointmentTime(time) {
    this.require = "true";
    this.svcsCtrl.clinicPatientAppointmentService.list(this.clinicId).subscribe((response) => {
      this.appointmentList = response;
      let appointmentList12 = this.appointmentList.filter(appointment => this.getDate(appointment.appointmentDate) == this.getDate(this.appointmentdate) && appointment.status != 'cancelled');
      for (let y in appointmentList12) {
        if (appointmentList12[y].appointmentTime === time) {
          this.appointment.appointmentTime = null;
          return this.presentToast('alreay booked.Pleace choose another time!', '')
        }
      }
    })
  }


  presentToast(message, value) {
    this.toast = this.toastCtrl.create({
      message: message + value,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    this.toast.onDidDismiss(this.dismissHandler);
    this.toast.present();
  }
  private dismissHandler() {

    console.info('Toast onDidDismiss()');
  }

  getDate(date) {
    let date1 = new Date(date).toLocaleDateString();
    return date1;
  }

  createAppointment1() {
    if (this.appointment.appointmentTime == null || this.appointment.appointmentTime == undefined) {
      this.require = "false";
    } else {
      this.require = "true";
      this.appointment.patient = this.svcsCtrl.homeService.getItem('patientId');
      this.svcsCtrl.clinicPatientAppointmentService.setItem('appointment', this.appointment);
      this.navCtrl.push('appointmentAddStep2')
    }
  }

}