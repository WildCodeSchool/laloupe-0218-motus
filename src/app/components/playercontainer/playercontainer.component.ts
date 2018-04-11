import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../models/player';

@Component({
  selector: 'app-playercontainer',
  templateUrl: './playercontainer.component.html',
  styleUrls: ['./playercontainer.component.scss']
})
export class PlayercontainerComponent implements OnInit {

  @Input()
  player: Player;

  @Input()
  playerNumber: number;

  constructor() { }

  ngOnInit() {
  }

}
