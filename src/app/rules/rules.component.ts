import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RulesDialogComponent } from '../components/rules/rules-dialog/rules-dialog.component';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RulesComponent implements OnInit {

  constructor(private dialog: MatDialog, public auth: AuthService) { }

  ngOnInit() {
  }
  onOpendDialog() {
    this.dialog.open(RulesDialogComponent);
  }

}
