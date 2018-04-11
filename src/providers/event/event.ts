//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';

@Injectable()
export class EventProvider {
  public eventListRef: Reference;

  constructor() {
    console.log('Hello EventProvider Provider');
    // baca dari database firebase
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase.database()
          .ref(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  // membuat event baru
  createEvent(
    eventName: string,
    eventDate: string,
    eventPrice: number,
    eventContact: string
  ): ThenableReference {
    return this.eventListRef.push({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,    // bertipe data number diikuti * 1
      contact: eventContact
    });
  }

  // melihat semua daftar event yang ada
  getEventList(): Reference {
    return this.eventListRef;
  }

  // melihat detail sebuah event
  getEventDetail(eventId: string): Reference {
    return this.eventListRef.child(eventId);
  }

  // menambahkan peserta baru
  addGuest(
    guestName: string,
    eventId: string,
    eventPrice: number,
    guestPicture: string = null
  ): PromiseLike<any> {
    return this.eventListRef
      .child(`${eventId}/guestList`)
      .push({ guestName })
      .then(newGuest => {
        this.eventListRef.child(eventId).transaction(event => {
          //event.price = event.price;
          return event;
        });
        if(guestPicture != null){
          firebase.storage()
            .ref(`/guestProfile/${newGuest.key}/profilePicture.png`)
            .putString(guestPicture, 'base64', {
              contentType: 'image/png'
            })
            .then(savedPicture => {
              this.eventListRef
                .child(`${eventId}/guestList/${newGuest.key}/profilePicture`)
                .set(savedPicture.downloadURL);
            });
        }
      });
  }

}