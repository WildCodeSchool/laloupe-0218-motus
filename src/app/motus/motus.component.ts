import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { MatInputModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as firebase from 'firebase/app';
import { WinDialogComponent } from '../components/win/win-dialog.component';
import { LooseDialogComponent } from '../components/loose/loose-dialog.component';
import { AuthService } from '../auth.service';

import { AngularFirestore } from 'angularfire2/firestore';
import { Player } from '../models/player';
import { Room } from '../models/room';
import { Cell } from '../models/cell';
import { Line } from '../models/line';
import { State } from '../models/state';

@Component({
  selector: 'app-motus',
  templateUrl: './motus.component.html',
  styleUrls: ['./motus.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MotusComponent implements OnInit {
  
  authSubscription: any;
  words = '';
  word = '';
  wordbank;
  wordwin = '';
  goodLetters = [];
  badLetters = [];
  myTry = 0;
  grid: Line[];
  guessWord = 'formuler';
  roomId;
  playerOne = new Player();
  playerTwo = new Player();
  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    private afs: AngularFirestore,
    public route:ActivatedRoute,
    private router: Router) {

    this.playerOne.name = 'Totor';
    this.playerTwo.name = 'Martine';
  }

  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
  ngOnInit() {
    this.afs.doc('wordbank/UR5mwNbejke3tekQMtHU').valueChanges().subscribe((wordbank) => {
      this.wordbank = wordbank;
      this.setRandomWord();
      this.initGrid();
    });
    this.afs.collection('rooms').valueChanges().subscribe((roomId) => {
      this.roomId = roomId;
      console.log(this.roomId);
      

    });
    this.roomId = this.route.snapshot.paramMap.get('id');

    this.authSubscription = this.auth.authState.subscribe((user) => {
      if (!user) {
        this.router.navigate(['login']);
      }
    });

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  initGrid() {
    this.grid = Array(8);
    let line = 0;
    let col = 0;
    while (line < 8) {
      const newLine = new Line();
      newLine.cells = Array(8);
      this.grid[line] = newLine;
      while (col < 8) {
        this.grid[line].cells[col] = new Cell();
        if (col === 0 && line === 0) {
          // this.grid[line].cells[col].letter.letter = this.randomWord[0].toUpperCase();
          this.grid[line].cells[col].letter = this.guessWord[0].toUpperCase();
        } else {
          // this.grid[line].cells[col].letter.letter = '.';
          this.grid[line].cells[col].letter = '.';
        }
        col = col + 1;
      }
      line = line + 1;
      col = 0;
    }
  }

  isLetterGood(line: number, col: number) {
    if (this.grid[line].cells[col].letter === this.guessWord[col]) {
      return true;
    }
    return false;
  }

  isLetterInWord(letter: string) {
    let i = 0;
    while (i < this.guessWord.length) {
      if (this.guessWord[i] === letter) {
        return true;
      }
      i += 1;
    }
    return false;
  }

  isLetterGoodInWholeWord(line: number, letter: string) {
    let col = 0;
    while (col < 8) {
      if (this.guessWord[col] === letter && !this.isLetterGood(line, col)) {
        return false;
      }
      col += 1;
    }
    return true;
  }

  isLetterMisplaced(line: number, col: number) {
    const letter = this.grid[line].cells[col].letter;
    return this.isLetterInWord(letter) &&
      !this.isLetterGood(line, col) &&
      !this.isLetterGoodInWholeWord(line, letter);
  }

  sendWord(line: number) {
    let col = 0;
    let column = 0;
    let badLetterCount = 0;

    this.word = this.word.toUpperCase();
    this.word.split('');
    this.guessWord.split('');

    while (col < 8) {
      this.grid[line].cells[col].letter = this.word[col];
      col += 1;
    }
    col = 0;
    while (col < 8) {
      if (this.isLetterGood(line, col)) {
        this.grid[line + 1].cells[col].letter = this.guessWord[col];
        this.goodLetters[col] = this.guessWord[col];
      } else {
        // console.log('avant boucle: ' + this.badLetter);
        console.log('check col : ' + col);
        if (this.isLetterMisplaced(line, col)) {
          this.badLetters[col] = this.grid[line].cells[col].letter;
        }
        // console.log('apres boucle: ' + this.badLetter);
        column = 0;
        if (col === 0) {
          this.grid[line + 1].cells[col].letter = this.guessWord[col];
        } else {
          if (line !== 0 && this.goodLetters[col] === this.guessWord[col]) {
            this.grid[line + 1].cells[col].letter = this.guessWord[col];
          } else {
            this.grid[line + 1].cells[col].letter = '.';
          }
        }
      }
      col = col + 1;
    }
    this.badLetters = [];
    this.word = '';
    for (let i = 0; i < this.guessWord.length; i = i + 1) {
      if (this.grid[line + 1].cells[i].letter === '.') {
        badLetterCount = badLetterCount + 1;
      }
    }
    if (badLetterCount === 0) {
      this.openWinDialog();
      for (let i = 0; i < this.guessWord.length; i = i + 1) {
        this.grid[line + 1].cells[i].letter = '.';
      }
    }
  }

  setRandomWord() {
    this.guessWord = this.wordbank.words[Math.floor(Math.random() * this.wordbank.words.length)];
    this.guessWord = this.guessWord.toUpperCase();
    console.log(this.guessWord);
  }

  openWinDialog(): void {
    const dialogRef = this.dialog.open(WinDialogComponent, {
      width: '250px',
    });
  }

  loosePopup(): void {
    const wordwin = this.guessWord;
    console.log(this.guessWord);
    const dialogRef = this.dialog.open(LooseDialogComponent, {
      width: '250px',
    });
  }



  playGame() {
    if (this.myTry < 7) {
      console.log(this.myTry);
      this.sendWord(this.myTry);
    } else {
      // this.loosePopup();
      this.looseGame();
    }
    this.myTry += 1;
  }
  looseGame() {
    let col = 0;
    let line = 1;
    // const looseWord = '..GAME..';
    while (col < 8) {
      this.grid[0][col] = this.guessWord[col];
      col = col + 1;
    }
    col = 0;

    // looseWord.split('');
    while (line < 8) {
      while (col < 8) {
        this.grid[line].cells[col].letter = '.';
        col = col + 1;
      }
      line = line + 1;
      col = 0;
    }
    this.loosePopup();
    // console.log(this.grid[2].join('').substr(2, 4).replace('....', '..GAME..').split(''));
  }

}
