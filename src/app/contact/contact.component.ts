import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public auth: AuthService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.snackBar.open('Order Submitted', 'retry', {
      duration: 3000,
    });
  }

}
