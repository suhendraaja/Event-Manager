//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';

@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  // register user baru
  signupUser(email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {    // resolve
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/email`)
          .set(email);
      })
      .catch(error => {       // jika ada error lempar ke catch
        console.error(error);
        throw new Error(error);
      });
  }

  // login user
  loginUser(email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  }

  // reset password user
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // logout user
  logoutUser(): Promise<void> {
    const userId: string =
      firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }

}
