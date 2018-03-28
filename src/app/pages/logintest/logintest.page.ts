import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Component({
  selector: 'logintest',
  templateUrl: './logintest.page.html',
  styleUrls: ['./logintest.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LogintestPage {
  constructor(public afAuth: AngularFireAuth, ) {
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  ngOnInit() {

  }

}