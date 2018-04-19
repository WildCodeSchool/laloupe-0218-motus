import { AuthService } from './../auth.service';
import { Player } from './../models/player';
import { Room } from './../models/room';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Line } from './../models/line';
import { Cell } from './../models/cell';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.scss'],
})
export class MatchmakingComponent implements OnInit {
  gridLength = 8;
  private authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private router: Router,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.authSubscription = this.authService.authState.take(1).subscribe((user) => {
      if (user) {
        this.getRooms();
      }
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  getRooms() {
    const roomsCollection = this.db.collection<Room>('rooms');

    // tslint:disable-next-line:no-shadowed-variable
    const snapshot = roomsCollection.snapshotChanges().take(1).subscribe((snapshot) => {
      const player = new Player();
      player.name = this.authService.user.displayName;
      player.image = this.authService.user.photoURL;
      player.score = 0;

      for (const snapshotItem of snapshot) {
        const roomId = snapshotItem.payload.doc.id;
        // tslint:disable-next-line:no-shadowed-variable
        const room = snapshotItem.payload.doc.data() as Room;

        if (Object.keys(room.players).length === 1) {
          room.players[this.authService.user.uid] = player;
          this.db.doc('rooms/' + roomId).update(JSON.parse(JSON.stringify(room)));
          this.router.navigate(['motus', roomId]);
          return;
        }
      }

      const room = new Room();
      room.players = {};
      room.turn = this.authService.user.uid;
      room.grid = Array
        .apply(null, Array(this.gridLength * this.gridLength))
        .map(Number.prototype.valueOf, 1);
      room.gridLenght = this.gridLength;

      room.players[this.authService.user.uid] = player;

      this.afs.doc('wordbank/UR5mwNbejke3tekQMtHU').valueChanges().take(1).subscribe((wordbank) => {
        this.setRandomWord(room, wordbank);
      });
    });
  }

  setRandomWord(room, wordbank) {
    room.guessWord = wordbank.words[Math.floor(Math.random() * wordbank.words.length)];
    room.guessWord = room.guessWord.toUpperCase();
    console.log(room.guessWord);
    this.initGrid(room);
  }


  initGrid(room: Room) {
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
    this.db.collection('rooms')
      .add(JSON.parse(JSON.stringify(room)))
      .then((doc) => {
        this.router.navigate(['motus', doc.id]);
      });
  }
}
