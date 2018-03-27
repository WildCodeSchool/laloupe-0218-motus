import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'motus',
  templateUrl: './motus.page.html',
  styleUrls: [ './motus.page.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class MotusPage {
  mot: string;
  lettre1: string;
  lettre2: string;
  lettre3: string;
  lettre4: string;
  lettre5: string;
  lettre6: string;
  lettre7: string;
  lettre8: string;
  arraymot = [];
  displayedColumns = ['1', '2', '3', '4', '5', '6', '7', '8'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() {
  }
  ngOnInit() {

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  submit() {
    console.log("ca clique " + this.mot);
    //this.transform(this.mot);
    this.compareWord(this.mot);
  }
  transform(pmot: string) {
    console.log(pmot.length);
    for (let i = 0; i < pmot.length; i++) {
      this.arraymot.push(pmot.slice(i, i + 1))
      console.log(this.arraymot);

    }
  }
  compareWord(pword: string) {
    let wordAuto: string = "formuler";
    let arrayWordAuto: Array<string> = [];
    let arrayPWord: Array<string> = [];

    for (let i = 0; i < wordAuto.length; i++) {
      arrayWordAuto.push(wordAuto.slice(i, i + 1));
      arrayPWord.push(pword.slice(i, i + 1));
    }
    for (let i = 0; i < 8; i++) {
      if (arrayPWord[i] == arrayWordAuto[i]) {
        this.arraymot[i] = arrayWordAuto[i];
      } else {
        this.arraymot[i] = "";
      }
    }
    //this.arraymot = arrayWordAuto;
    console.log(arrayWordAuto);
    const object2 = Object.assign({}, ['a', 'b', 'c']);
    console.log(object2[0]);
  }
}
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

