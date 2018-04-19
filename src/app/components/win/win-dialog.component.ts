import { Component, Inject, OnInit, Host } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MotusComponent } from './../../motus/motus.component';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Room } from './../../models/room';
import { GameService } from './../../game.service';

@Component({
  selector: 'app-win-dialog',
  templateUrl: './win-dialog.component.html',
})
export class WinDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WinDialogComponent>,
    public route: ActivatedRoute,
    private afs: AngularFirestore,
    private gameService: GameService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.afs.doc<Room>('rooms/' + this.gameService.roomId).valueChanges().take(1).subscribe((room) => {
      room.players[Object.keys(room.players)[0]].status = null;
      room.players[Object.keys(room.players)[1]].status = null;
      this.gameService.restartGame(this.gameService.roomId, room);
    });
    this.dialogRef.close();
  }

}

