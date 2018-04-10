import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  // melihat profile
  goToProfile():void {
    this.navCtrl.push('ProfilePage');
  }

  // membuat event baru
  goToCreate():void {
    this.navCtrl.push('EventCreatePage');
  }

  // melihat daftar event
  goToList():void {
    this.navCtrl.push('EventListPage');
  }

}
