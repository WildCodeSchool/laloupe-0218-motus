import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as firebase from 'firebase/app';
import { WinDialogComponent } from '../components/win/win-dialog.component';
import { LooseDialogComponent } from '../components/loose/loose-dialog.component';
import { AuthService } from '../auth.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-motus',
  templateUrl: './motus.component.html',
  styleUrls: ['./motus.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MotusComponent implements OnInit {
  authSubscription: any;
  word = '';
  wordwin = '';
  goodLetter = [];
  badLetter = [];
  myTry = 0;
  wordbank;
  // grid: string[][] = [
  //   ['f', 'o', 'r', 'm', 'u', 'l', 'e', 'r']
  // ];
  grid: string[][] = [['']];
  randomWord: string;
  constructor(
    private afs: AngularFirestore,
    private dialog: MatDialog,
    public auth: AuthService,
    private router: Router) {
  }



  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
  ngOnInit() {

    this.authSubscription = this.auth.authState.subscribe((user) => {
      if (!user) {
        this.router.navigate(['login']);
      }
    });
    this.afs.doc('wordbank/UR5mwNbejke3tekQMtHU').valueChanges().subscribe((wordbank) => {
      this.wordbank = wordbank;
      this.setRandomWord();
    });
  }

  setRandomWord() {
    this.randomWord = this.wordbank.words[Math.floor(Math.random() * this.wordbank.words.length)];
    console.log(this.randomWord);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  initialiserGrid() {
    let line = 0;
    let col = 0;

    this.randomWord.split('');
    while (line < 8) {
      this.grid.push([]);
      while (col < 8) {
        if (col === 0 && line === 0) {
          this.grid[line][col] = this.randomWord[0].toUpperCase();
        } else {
          this.grid[line][col] = '.';
        }
        col = col + 1;
      }
      line = line + 1;
      col = 0;
    }
  }
  sendWord(line: number) {
    let col = 0;
    let column = 0;
    let count = 0;

    this.word = this.word.toUpperCase();
    this.randomWord = this.randomWord.toUpperCase();
    this.word.split('');
    this.randomWord.split('');

    while (col < 8) {
      this.grid[line][col] = this.word[col];
      if (this.grid[line][col] === this.randomWord[col]) {
        this.grid[line + 1][col] = this.randomWord[col];
        this.goodLetter[col] = this.randomWord[col];
      } else {
        // console.log('avant boucle: ' + this.badLetter);
        while (column < 8) {
          if (this.grid[line][col] === this.randomWord[column]) {
            this.badLetter[col] = this.randomWord[column];
          }
          column = column + 1;
        }
        // console.log('apres boucle: ' + this.badLetter);
        column = 0;
        if (col === 0) {
          this.grid[line + 1][col] = this.randomWord[col];
        } else {
          if (line !== 0 && this.goodLetter[col] === this.randomWord[col]) {
            this.grid[line + 1][col] = this.randomWord[col];
          } else {
            this.grid[line + 1][col] = '.';
          }
        }
      }
      col = col + 1;
    }
    this.badLetter = [];
    this.word = '';
    for (let i = 0; i < this.randomWord.length; i = i + 1) {
      if (this.grid[line + 1][i] === '.') {
        count = count + 1;
      }
    }
    if (count === 0) {
      this.openDialog();
      for (let i = 0; i < this.randomWord.length; i = i + 1) {
        this.grid[line + 1][i] = '.';
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WinDialogComponent, {
      width: '250px',
    });
  }

  loosePopup(): void {
    const wordwin = this.randomWord;
    console.log(this.randomWord);
    const dialogRef = this.dialog.open(LooseDialogComponent, {
      width: '250px',
    });
  }



  playGame() {
    if (this.myTry < 7) {
      this.sendWord(this.myTry);
    } else {
      // this.loosePopup();
      this.looseGame();
    }
    this.myTry = this.myTry + 1;
  }
  looseGame() {
    let col = 0;
    let line = 1;
    // const looseWord = '..GAME..';
    while (col < 8) {
      this.grid[0][col] = this.randomWord[col];
      col = col + 1;
    }
    col = 0;

    // looseWord.split('');
    while (line < 8) {
      while (col < 8) {
        this.grid[line][col] = '.';
        col = col + 1;
      }
      line = line + 1;
      col = 0;
    }
    this.loosePopup();
    // console.log(this.grid[2].join('').substr(2, 4).replace('....', '..GAME..').split(''));
  }
}
