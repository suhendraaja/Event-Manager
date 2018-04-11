import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { Alert, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider) {
  }

  ionViewDidLoad() {      // function yg otomatis dikerjakan oleh browser
    console.log('ionViewDidLoad ProfilePage');

    // cek userProfile dari firebase
    this.profileProvider.getUserProfile()
      .on('value', userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.val();
      });
  }

  // proses logout
  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

  // update nama
  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Isikan nama lengkap',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Isikan nama pertama',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Isikan nama akhir',
          value: this.userProfile.lastName
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  // update tanggal lahir
  updateDOB(birthDate: string): void {
    this.profileProvider.updateDOB(birthDate);
  }

  // update password
  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'Password baru', type: 'password'},
        { name: 'oldPassword', placeholder: 'Password lama', type: 'password'}
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }

}
