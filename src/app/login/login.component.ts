import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  authSubscription;
  constructor(public auth: AuthService, private router: Router) {
  }
  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
  ngOnInit() {
    this.authSubscription = this.auth.authState.subscribe((user) => {
      if (user) {
        this.router.navigate(['matchmaking']);
      }
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
