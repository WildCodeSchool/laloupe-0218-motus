import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable()
export class AuthService {

  user: any;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

        //// Get auth data, then get firestore user document || null
      // this.afAuth.authState
      //       // tslint:disable-next-line:ter-arrow-parens
      //       .switchMap(user => {
      //         if (user) {
      //           this.user = user;
      //           console.log('toto', user);
      //           return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      //         // tslint:disable-next-line:no-else-after-return
      //         } else {
      //           return Observable.of(null);
      //         }
      //       });

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
        this.router.navigate(['login']);
      }
    });
  }
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  get authState() {
    return this.afAuth.authState;
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
              this.updateUserData(credential.user);
            });
  }


  private updateUserData(user) {
        // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });

  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
