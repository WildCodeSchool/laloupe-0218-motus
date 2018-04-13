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
import { GameService } from './../game.service';

@Component({
  selector: 'app-motus',
  templateUrl: './motus.component.html',
  styleUrls: ['./motus.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MotusComponent implements OnInit {
  authSubscription: any;
  roomId;
  room: Room;
  word = '';

  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    public gameService: GameService,
    private afs: AngularFirestore,
    public route: ActivatedRoute,
    private router: Router) {
  }

  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.gameService.roomId = this.roomId;

    this.authSubscription = this.auth.authState.subscribe((user) => {
      if (!user) {
        this.router.navigate(['login']);
      }
    });

    this.afs.doc<Room>('rooms/' + this.roomId).valueChanges().subscribe((room) => {
      this.room = room;
      if (this.me.status === 'win') {
        this.openWinDialog();
      } else if (this.me.status === 'loose') {
        this.loosePopup();
      }
    });

  }

  get me(): Player {
    if (!this.room) {
      return null;
    }
    return this.room.players[this.auth.user.uid];
  }

  get opponent(): Player {
    if (!this.room) {
      return null;
    }
    const ids = Object.keys(this.room.players);
    if (this.auth.user.uid === ids[0]) {
      return this.room.players[ids[1]];
    }
    return this.room.players[ids[0]];
  }

  get opponentId() {
    if (!this.room) {
      return null;
    }
    const ids = Object.keys(this.room.players);
    if (this.auth.user.uid === ids[0]) {
      return ids[1];
    }
    return ids[0];
  }

  get player1() {
    if (!this.room) {
      return null;
    }
    return this.room.players[Object.keys(this.room.players)[0]];
  }

  get player2() {
    if (!this.room) {
      return null;
    }
    return this.room.players[Object.keys(this.room.players)[1]];
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  isLetterGood(line: number, col: number) {
    if (this.room.grid[line].cells[col].letter === this.room.guessWord[col]) {
      return true;
    }
    return false;
  }

  isLetterInWord(letter: string) {
    let i = 0;
    while (i < this.room.guessWord.length) {
      if (this.room.guessWord[i] === letter) {
        return true;
      }
      i += 1;
    }
    return false;
  }

  isLetterGoodInWholeWord(line: number, letter: string) {
    let col = 0;
    while (col < 8) {
      if (this.room.guessWord[col] === letter && !this.isLetterGood(line, col)) {
        return false;
      }
      col += 1;
    }
    return true;
  }

  isLetterMisplaced(line: number, col: number) {
    const letter = this.room.grid[line].cells[col].letter;
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
    this.room.guessWord.split('');

    while (col < 8) {
      this.room.grid[line].cells[col].letter = this.word[col];
      col += 1;
    }
    col = 0;
    while (col < 8) {
      if (this.isLetterGood(line, col)) {
        this.room.grid[line + 1].cells[col].letter = this.room.guessWord[col];
        this.room.goodLetters[col] = this.room.guessWord[col];
      } else {
        // console.log('avant boucle: ' + this.badLetter);
        console.log('check col : ' + col);
        if (this.isLetterMisplaced(line, col)) {
          this.room.badLetters[col] = this.room.grid[line].cells[col].letter;
        }
        // console.log('apres boucle: ' + this.badLetter);
        column = 0;
        if (col === 0) {
          this.room.grid[line + 1].cells[col].letter = this.room.guessWord[col];
        } else {
          if (line !== 0 && this.room.goodLetters[col] === this.room.guessWord[col]) {
            this.room.grid[line + 1].cells[col].letter = this.room.guessWord[col];
          } else {
            this.room.grid[line + 1].cells[col].letter = '.';
          }
        }
      }
      col = col + 1;
    }
    this.room.badLetters = [];
    this.word = '';
    for (let i = 0; i < this.room.guessWord.length; i = i + 1) {
      if (this.room.grid[line + 1].cells[i].letter === '.') {
        badLetterCount = badLetterCount + 1;
      }
    }
    if (badLetterCount === 0) {
      this.me.score += 1;
      this.me.status = 'win';
      this.opponent.status = 'loose';
      for (let i = 0; i < this.room.guessWord.length; i = i + 1) {
        this.room.grid[line + 1].cells[i].letter = '.';
      }
    }
  }

  openWinDialog(): void {
    const dialogRef = this.dialog.open(WinDialogComponent, {
      width: '250px',
    });
  }

  loosePopup(): void {
    const wordwin = this.room.guessWord;
    console.log(this.room.guessWord);
    const dialogRef = this.dialog.open(LooseDialogComponent, {
      width: '250px',
    });
  }

  updateRoom() {
    this.afs.doc<Room>('rooms/' + this.roomId).set(JSON.parse(JSON.stringify(this.room)));
  }

  isMyTurn() {
    return this.auth.user.uid === this.room.turn;
  }

  isMe(player) {
    if (!player) {
      return false;
    }
    return player.name === this.auth.user.displayName;
  }

  isPlayerTurn(playerId) {
    if (!this.room) {
      return false;
    }
    const ids = Object.keys(this.room.players);
    return ids[playerId] === this.room.turn;
  }

  changeTurn() {
    this.room.turn = this.room.turn === this.room.turn ? this.opponentId : this.room.turn;
  }

  playGame() {
    if (!this.isMyTurn()) {
      return;
    }
    if (this.room.myTry < 7) {
      console.log(this.room.myTry);
      this.sendWord(this.room.myTry);
    } else {
      this.looseGame();
    }
    this.room.myTry += 1;
    this.changeTurn();
    this.updateRoom();
  }

  looseGame() {
    let col = 0;
    let line = 1;
    // const looseWord = '..GAME..';
    while (col < 8) {
      this.room.grid[0].cells[col].letter = this.room.guessWord[col];
      col = col + 1;
    }
    col = 0;

    // looseWord.split('');
    while (line < 8) {
      while (col < 8) {
        this.room.grid[line].cells[col].letter = '.';
        col = col + 1;
      }
      line = line + 1;
      col = 0;
    }
    this.me.status = 'loose';
    this.opponent.status = 'loose';
    // console.log(this.room.grid[2].join('').substr(2, 4).replace('....', '..GAME..').split(''));
  }

}
