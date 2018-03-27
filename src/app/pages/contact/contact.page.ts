import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'contact',
  templateUrl: './contact.page.html',
  styleUrls: [ './contact.page.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class ContactPage {

  constructor(private snackBar: MatSnackBar) {
  }
  onSubmit() {
    this.snackBar.open("Order Submitted", "retry", {
      duration: 3000,
    });
  }
}
