import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatInputModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as firebase from 'firebase/app';
import { WinDialogComponent } from '../components/win/win-dialog.component';
import { LooseDialogComponent } from '../components/loose/loose-dialog.component';


@Component({
  selector: 'app-motus',
  templateUrl: './motus.component.html',
  styleUrls: ['./motus.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MotusComponent implements OnInit {
  word = '';
  wordwin = '';
  goodLetter = [];
  myTry = 0;
  // grid: string[][] = [
  //   ['f', 'o', 'r', 'm', 'u', 'l', 'e', 'r']
  // ];
  grid: string[][] = [['']];
  randomWord = 'formuler';
  constructor(private dialog: MatDialog, public afAuth: AngularFireAuth) {
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  ngOnInit() {
    this.initialiserGrid();
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
    // console.log(this.word);
    // console.log(this.grid);
    // this.grid[0][0] = 'A';
    let col = 0;
    let count = 0;

    this.word = this.word.toUpperCase();
    this.randomWord = this.randomWord.toUpperCase();
    this.word.split('');
    this.randomWord.split('');

    while (col < 8) {
      this.grid[line][col] = this.word[col];
      if (this.grid[line][col] === this.randomWord[col]) {
        this.grid[line + 1][col] = this.randomWord[col];
      } else {
        if (col === 0) {
          this.grid[line + 1][col] = this.randomWord[col];
        } else {
          if (line !== 0 && this.grid[line - 1][col] === this.randomWord[col]) {
            this.grid[line + 1][col] = this.randomWord[col];
          } else {
            this.grid[line + 1][col] = '.';
          }
        }
      }
      col = col + 1;
    }

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
      console.log('Game Over, Try Again !!!');
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
