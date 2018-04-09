import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase, { Unsubscribe } from 'firebase';    // karena download dari npm
import { firebaseConfig } from './credentials';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen) {

    platform.ready().then(() => {     // Promise
      // membaca API key dari firebase untuk pertama kali aplikasi dijalankan
      firebase.initializeApp(firebaseConfig);
      
      // cek user sedang logged in atau belum
      const unsubscribe: Unsubscribe = 
            firebase.auth()
            .onAuthStateChanged(user => {
              if(!user){      // user belum logged in
                this.rootPage = 'LoginPage';
                unsubscribe();
              } else {
                this.rootPage = HomePage;   // user masih logged in
                unsubscribe();
              }
            });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

