import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: [ './home.page.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    
  }

}
