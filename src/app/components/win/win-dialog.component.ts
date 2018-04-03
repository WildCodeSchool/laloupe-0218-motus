import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-win-dialog',
  templateUrl: './win-dialog.component.html',
})
export class WinDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WinDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

