import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactPage implements OnInit {

  constructor(private snackBar: MatSnackBar, public auth: AuthService) {
  }
  onSubmit() {
    this.snackBar.open('Order Submitted', 'retry', {
      duration: 3000,
    });
  }
}
