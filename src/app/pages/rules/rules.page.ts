import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RulesDialogComponent } from '../../components/rules/rules-dialog/rules-dialog.component';

@Component({
  selector: 'rules',
  templateUrl: './rules.page.html',
  styleUrls: [ './rules.page.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class RulesPage {

  constructor(private dialog: MatDialog) {
  }
  onOpendDialog() {
    this.dialog.open(RulesDialogComponent)
  }

}
