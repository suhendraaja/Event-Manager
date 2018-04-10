import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  Alert, AlertController,
  Loading, LoadingController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder) {

    // validasi form
    this.signupForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }

  // proses register user baru
  signupUser(): void {
    // cek validasi form
    if(!this.signupForm.valid){     // jika form belum valid
      console.log(`Lengkapi isian form: ${this.signupForm.value}`);
    } else {        // jika form sudah valid
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      // cek dari firebase
      this.authProvider.signupUser(email, password).then(
        user => {       // resolve
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {      // reject
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{
                text: 'Ok',
                role: 'cancel'
              }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
