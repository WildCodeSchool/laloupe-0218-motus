import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-loose-dialog',
  templateUrl: './loose-dialog.component.html',
})
export class LooseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LooseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    document.location.reload(true);
    this.dialogRef.close();
  }

}

