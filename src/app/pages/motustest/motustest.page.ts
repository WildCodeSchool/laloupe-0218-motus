import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

 

@Component({
  selector: 'motustest',
  templateUrl: './motustest.page.html',
  styleUrls: ['./motustest.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MotustestPage {
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
  submit() {
    //console.log("ca clique " + this.mot);
    //this.transform(this.mot);
    this.compareWord();
  }
  compareWord(){
    document.getElementById("row1-1").innerText = "A";
    document.getElementById("row1-2").innerText = "B";
  }
}

