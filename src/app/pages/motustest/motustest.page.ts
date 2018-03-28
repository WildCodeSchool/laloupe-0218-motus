import { Component, ViewEncapsulation } from '@angular/core';
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
export class MotustestPage {
  word: string = "";
  letter = [];
  // grid: string[][] = [
  //   ["f", "o", "r", "m", "u", "l", "e", "r"]
  // ];
  grid: string[][] = [[""]];
  randomWord = "formuler";
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

  sendWord() {
    console.log(this.word);
    let i = 0;
    this.grid.push(this.word.split(""));

    this.grid.push([]);

    this.randomWord.split("");
    console.log(this.randomWord);
    while (i < 8) {
      if (this.grid[1][i] == this.randomWord[i]) {
        this.grid[2][i] = this.randomWord[i];
        console.log("lettre identique");
      } else {
        this.grid[2][i] = "";
        console.log("lettre differente");
      }
      console.log('saisi: ' + this.grid[1][i]);
      console.log('soluce: ' + this.randomWord[i]);
      i++;
    }


    this.word = "";

  }





  submit() {
    //console.log("ca clique " + this.mot);
    //this.transform(this.mot);
    this.compareWord(this.word);
  }
  compareWord(pword: string) {

    //    let wordAuto = ["formuler","azertyui","qsdfghjk","wxcvbnnb","mlkjhgfd","poiuytre","poutress","ascvbhui"];
    /*let arrayWordAuto: Array<string> = [];
    let arrayPWord: Array<string> = [];
    let col = 1;
    let lig = 1;

    for (let i = 0; i < 8; i++) {
      this.arraymot[lig - col] = pword[i];

      // if (arrayPWord[i] == arrayWordAuto[i]) {
      //   this.arraymot[lig - col] = arrayWordAuto[i];
      // } else {
      //   this.arraymot[lig - col] = "";
      // }
      col++;
    }*/

    //this.arraymot = arrayWordAuto;
    // console.log(arrayWordAuto);
    // const object2 = Object.assign({}, ['a', 'b', 'c']);
    // console.log(object2[0]);
    // for (let i = 1; i < 9; i++) {
    //   this.arraymot[1-i] = "A";
    // }
    //document.getElementById("row1-2").innerText = "B";
  }
}

