import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'hometest',
  templateUrl: './hometest.page.html',
  styleUrls: [ './hometest.page.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class HometestPage {
  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    
  }

}
