import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as firebase from 'firebase/app';



@Component({
  selector: 'motustest',
  templateUrl: './motustest.page.html',
  styleUrls: ['./motustest.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MotustestPage implements OnInit {
  mot: string; // variable de saisie par l utilisateur issue du input
  nbClick: number = 0 // compteur initialiser a zero permettant de savoir le nombre de coup joué
  motRef: string = "azertyui"; // variable de test permettant de faire les essais
  lettre1: string; // non utilisé
  lettre2: string; // non utilisé
  lettre3: string; // non utilisé
  lettre4: string; // non utilisé
  lettre5: string; // non utilisé
  lettre6: string; // non utilisé
  lettre7: string; // non utilisé
  lettre8: string; // non utilisé
  arraymot: string[] = []; // variable tableau du mot saisi tronqué lettre par lettre par transform
  arraymotRef: string[] = []; // variable tableau du mot recherché  tronqué lettre par lettre par transform
  arraylettreOK: string[] = []; // variable tableau des lettres a la bonne place
  arraylettreNOK: string[] = []; // variable tableau des lettres pas a la bonne place mais present dans le mot
  constructor(public afAuth: AngularFireAuth, ) {
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  ngOnInit() {

    this.transform(this.motRef, this.arraymotRef)
  }
  submit() {
    this.nbClick += 1
    //console.log("ca clique " + this.mot);
    this.transform(this.mot, this.arraymot);
    this.compareWord(this.arraymot);
  }
  transform(pmot: string, parray: string[]) {
    //console.log(pmot.length);
    for (let i = 0; i < pmot.length; i++) {
      parray.push(pmot.slice(i, i + 1))
      console.log(parray);

    }
  }
  compareWord(parray: string[]) {
    for (let i = 1; i < parray.length; i++) {
      switch (parray[i]) {
        case this.arraymotRef[1]:
          if (i == 1) {
            this.arraylettreOK.push(parray[i])
          } else {
            this.arraylettreNOK.push(parray[i])
          }
          break;
        case this.arraymotRef[2]:
          //console.log('ok2')
          if (i == 2) {
            this.arraylettreOK.push(parray[i])
          } else {
            this.arraylettreNOK.push(parray[i])
          }
          break;
        case this.arraymotRef[3]:
          //console.log('ok3')
          if (i == 3) {
            this.arraylettreOK.push(parray[i])
          } else {
            this.arraylettreNOK.push(parray[i])
          }
          break;
        case this.arraymotRef[4]:
          //console.log('ok4')
          if (i == 4) {
            this.arraylettreOK.push(parray[i])
          } else {
            this.arraylettreNOK.push(parray[i])
          }
          break;
        case this.arraymotRef[5]:
          //console.log('ok5')
          if (i == 5) {
            this.arraylettreOK.push(parray[i])
          } else {
            this.arraylettreNOK.push(parray[i])
          }
          break;
        case this.arraymotRef[6]:
          //console.log('ok6')
          if (i == 6) {
            this.arraylettreOK.push(parray[i])
          } else {
            this.arraylettreNOK.push(parray[i])
          }
          break;
        case this.arraymotRef[7]:
          //console.log('ok7')
          if (i == 7) {
            this.arraylettreOK.push(parray[i])
          } else {
            this.arraylettreNOK.push(parray[i])
          }
          break;
        default:
          this.arraylettreOK.push("")
          this.arraylettreNOK.push("")
          break;
      } // fin du switch
    } // fin du for
    console.log("NONOK " + this.arraylettreNOK, "OK " + this.arraylettreOK);
  } // fin de fonction compare
}

