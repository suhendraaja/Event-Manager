//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User, AuthCredential } from '@firebase/auth-types';
import { Reference } from '@firebase/database-types';

@Injectable()
export class ProfileProvider {
  public userProfile: Reference;
  public currentUser: User;

  constructor() {
    console.log('Hello ProfileProvider Provider');

    // cek firebase
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database()
          .ref(`/userProfile/${user.uid}`);
      }
    });
  }

  getUserProfile(): Reference {
    return this.userProfile;
  }

}
