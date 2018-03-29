import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RulesDialogComponent } from '../../components/rules/rules-dialog/rules-dialog.component';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'rules',
  templateUrl: './rules.page.html',
  styleUrls: ['./rules.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RulesPage {

  constructor(private dialog: MatDialog, public auth: AuthService) {
  }
  onOpendDialog() {
    this.dialog.open(RulesDialogComponent);
  }

}
