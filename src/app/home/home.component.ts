import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RulesDialogComponent } from '../components/rules/rules-dialog/rules-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  authSubscription: any;
  constructor(private dialog: MatDialog) {
  }
  ngOnInit() {

  }
  onOpendDialog() {
    this.dialog.open(RulesDialogComponent);
  }
}
