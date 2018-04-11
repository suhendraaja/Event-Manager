import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase, { Unsubscribe } from 'firebase';    // karena download dari npm
import { firebaseConfig } from './credentials';
import { OneSignal } from '@ionic-native/onesignal';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private notif: OneSignal) {

      this.onesignalinitialize();

    platform.ready().then(() => {     // Promise
      // membaca API key dari firebase untuk pertama kali aplikasi dijalankan
      firebase.initializeApp(firebaseConfig);

      // cek user sedang logged in atau belum
      const unsubscribe: Unsubscribe =
        firebase.auth()
          .onAuthStateChanged(user => {
            if (!user) {      // user belum logged in
              this.rootPage = 'LoginPage';
              unsubscribe();
            } else {
              this.rootPage = HomePage;   // user masih logged in
              unsubscribe();
            }
          });

      // akses OneSignal
      /*
      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("186c67e8-fb18-47c7-9950-afb244a3aaad", "529154349639")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();*/

        
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onesignalinitialize(){
    this.notif.startInit('186c67e8-fb18-47c7-9950-afb244a3aaad', '529154349639');
    this.notif.inFocusDisplaying(this.notif.OSInFocusDisplayOption.Notification);
    this.notif.handleNotificationReceived().subscribe(() => {
      // push notif diterima
    });
    this.notif.handleNotificationOpened().subscribe(() => {
      // push notif dibuka
    });
    this.notif.endInit();
  }

}