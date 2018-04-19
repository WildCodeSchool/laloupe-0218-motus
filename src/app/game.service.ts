import { Injectable } from '@angular/core';
import { Room } from './models/room';
import { Line } from './models/line';
import { Cell } from './models/cell';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class GameService {

  roomId: string;

  constructor(
    private db: AngularFirestore,
  ) { }

  restartGame(roomId: string, room: Room) {
    room.wordwin = '';
    room.goodLetters = [];
    room.badLetters = [];
    room.myTry = 0;
    this.db.doc('wordbank/UR5mwNbejke3tekQMtHU').valueChanges().take(1).subscribe((wordbank) => {
      this.setRandomWord(roomId, room, wordbank);
    });
  }

  setRandomWord(roomId, room, wordbank) {
    room.guessWord = wordbank.words[Math.floor(Math.random() * wordbank.words.length)];
    room.guessWord = room.guessWord.toUpperCase();
    console.log(room.guessWord);
    this.initGrid(roomId, room);
  }


  initGrid(roomId: string, room: Room) {
    room.grid = Array(8);
    let line = 0;
    let col = 0;
    while (line < 8) {
      const newLine = new Line();
      newLine.cells = Array(8);
      room.grid[line] = newLine;
      while (col < 8) {
        room.grid[line].cells[col] = new Cell();
        if (col === 0 && line === 0) {
          // this.grid[line].cells[col].letter.letter = this.randomWord[0].toUpperCase();
          room.grid[line].cells[col].letter = room.guessWord[0].toUpperCase();
        } else {
          // this.grid[line].cells[col].letter.letter = '.';
          room.grid[line].cells[col].letter = '.';
        }
        col = col + 1;
      }
      line = line + 1;
      col = 0;
    }
    this.db.doc('rooms/' + roomId)
      .set(JSON.parse(JSON.stringify(room)));
  }

}
