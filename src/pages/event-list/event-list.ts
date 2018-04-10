import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  public eventList: Array<any>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');

    // baca dari firebase
    this.eventProvider.getEventList()
      .on('value', eventListSnapshot => {
        this.eventList = [];    // array
        eventListSnapshot.forEach(snap => {   // snap bukan void, butuh return
          this.eventList.push({
            id: snap.key,
            name: snap.val().name,
            date: snap.val().date,
            price: snap.val().price,
            contact: snap.val().contact
          });
          return false;
        });
      });
  }

  // melihat detail event
  goToEventDetail(eventId): void {
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }

}
