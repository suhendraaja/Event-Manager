import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  Alert, AlertController,
  Loading, LoadingController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../../pages/home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public googlePlus: GooglePlus) {

    // validasi form
    this.loginForm = formBuilder.group({
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

  // proses login user
  loginUser() {
    // cek apakah email dan password sudah valid
    if (!this.loginForm.valid) {      // jika tidak valid
      console.log(`Form tidak valid: ${this.loginForm.value}`);
    } else {      // jika sudah valid
      // baca formControlName dahulu
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // cek dari firebase
      this.authProvider.loginUser(email, password).then(
        authData => {       // resolve
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {          // reject
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

  // membuka form signup
  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  // membuka form reset password
  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  // membuka login dengan google
  goToLoginGoogle(): void {
    this.googlePlus.login({
      'webClientId': 'AIzaSyD0ynYZfqwHVlQrHp4qjG1G6i-h_Pje6Nk',
      'offline': true
    }).then(result => {
      const googleCredential = firebase.auth.GoogleAuthProvider
        .credential(result.idToken);
      firebase.auth().signInWithCredential(googleCredential)
        .then(response => {
          console.log("Firebase sukses: " + JSON.stringify(response));
        });
    }, error => {
      console.log("Error : ", error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
