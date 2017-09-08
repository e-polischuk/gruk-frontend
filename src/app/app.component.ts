import { Component, OnInit } from '@angular/core';
import { FullName } from './appclass/fullname';
import { CitizenService } from './appservice/citizen.service';
import { Citizen } from './appclass/citizen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CitizenService]
})
export class AppComponent {
    authorized: boolean;
    citizen: Citizen;
    
    constructor() {}
    
    ngOnInit() {
        this.authorized = false;
    }
}
