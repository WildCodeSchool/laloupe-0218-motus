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
  arrayMot0: string[] = [];
  arrayMot1: string[] = []; 
  arrayMot2: string[] = []; 
  arrayMot3: string[] = []; 
  arrayMot4: string[] = []; 
  arrayMot5: string[] = []; 
  arrayMot6: string[] = []; 
  arrayMot7: string[] = []; 
 // stockage de chaque saisie
  arrayMotGlobal=[
    this.arrayMot0,
    this.arrayMot1,
    this.arrayMot2,
    this.arrayMot3,
    this.arrayMot4,
    this.arrayMot5,
    this.arrayMot6,
    this.arrayMot7
    
  ];
  
  arraymot: string[] = []; // variable tableau du mot saisi tronqué lettre par lettre par transform
  arraymotRef: string[] = []; // variable tableau du mot recherché  tronqué lettre par lettre par transform
  arrayLettreOk: string[] = []; // variable tableau des lettres a la bonne place
  arrayLettreNoOk: string[] = []; // variable tableau des lettres pas a la bonne place mais present dans le mot
  arrayStoreOk: string[] = []; // stocke l information des bonne lettre pour repercution sur ligne suivante
  arrayStoreNoOk: string[] = []; // stocke les lettre pas a la bonne place pour colorise
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
    this.arrayLettreOk[0]=this.arraymotRef[0];
    this.arrayMot0 = [this.arraymotRef[0],"","","","","","",""];
  }
  submit() {
    var i = this.nbClick
    //console.log("ca clique " + this.mot);
    this.transform(this.mot, this.arraymot);
    this.compareWord(this.arraymot);
    for(let j=0; j<this.arraymot.length;j++){
      
      
      this.arrayMotGlobal[i][j] = this.arraymot[j];
      console.log("toto" + this.arrayMotGlobal[i][j]);
    }
    
    console.log(this.arraymot,this.arrayMot0)
    this.mot="";
    this.arraymot=[];
    this.nbClick += 1
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
            this.arrayLettreOk.push(parray[i])
            this.arrayLettreNoOk.push("")
          } else {
            this.arrayLettreNoOk.push(parray[i])
            this.arrayLettreOk.push("")

          }
          break;
        case this.arraymotRef[2]:
          //console.log('ok2')
          if (i == 2) {
            this.arrayLettreOk.push(parray[i])
            this.arrayLettreNoOk.push("")
          } else {
            this.arrayLettreNoOk.push(parray[i])
            this.arrayLettreOk.push("")
          }
          break;
        case this.arraymotRef[3]:
          //console.log('ok3')
          if (i == 3) {
            this.arrayLettreOk.push(parray[i])
            this.arrayLettreNoOk.push("")
          } else {
            this.arrayLettreNoOk.push(parray[i])
            this.arrayLettreOk.push("")
          }
          break;
        case this.arraymotRef[4]:
          //console.log('ok4')
          if (i == 4) {
            this.arrayLettreOk.push(parray[i])
            this.arrayLettreNoOk.push("")
          } else {
            this.arrayLettreNoOk.push(parray[i])
            this.arrayLettreOk.push("")
          }
          break;
        case this.arraymotRef[5]:
          //console.log('ok5')
          if (i == 5) {
            this.arrayLettreOk.push(parray[i])
            this.arrayLettreNoOk.push("")
          } else {
            this.arrayLettreNoOk.push(parray[i])
            this.arrayLettreOk.push("")
          }
          break;
        case this.arraymotRef[6]:
          //console.log('ok6')
          if (i == 6) {
            this.arrayLettreOk.push(parray[i])
            this.arrayLettreNoOk.push("")
          } else {
            this.arrayLettreNoOk.push(parray[i])
            this.arrayLettreOk.push("")
          }
          break;
        case this.arraymotRef[7]:
          //console.log('ok7')
          if (i == 7) {
            this.arrayLettreOk.push(parray[i])
            this.arrayLettreNoOk.push("")
          } else {
            this.arrayLettreNoOk.push(parray[i])
            this.arrayLettreOk.push("")
          }
          break;
        default:
          this.arrayLettreOk.push("")
          this.arrayLettreNoOk.push("")
          break;
      } // fin du switch
    } // fin du for
    this.arrayStoreOk = this.arrayLettreOk;
    this.arrayStoreNoOk = this.arrayLettreNoOk;
    this.arrayLettreOk = [];
    this.arrayLettreNoOk = [];
    console.log("NONOK " + this.arrayStoreNoOk, "OK " + this.arrayStoreOk);
  } // fin de fonction compare
}

