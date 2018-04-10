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

}
