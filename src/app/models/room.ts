import { Player } from './player';
import { Line } from './line';

export class Room {
  players: {};
  turn: string;
  winner: string;
  grid: Line[];
  gridLenght: number;
  guessWord: string;
  wordwin = '';
  goodLetters = [];
  badLetters = [];
  myTry = 0;
}

