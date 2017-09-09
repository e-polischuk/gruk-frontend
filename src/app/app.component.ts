import { Component, OnInit, OnDestroy } from '@angular/core';
import { FullName } from './appclass/fullname';
import { CitizenService } from './appservice/citizen.service';
import { Citizen } from './appclass/citizen';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CitizenService]
})
export class AppComponent implements OnDestroy {
    authorized: boolean;
    citizen: Citizen;
    closed: boolean = false;
    
    constructor(private http: Http, private router: Router) {}
    
    ngOnInit() {
        this.authorized = false;
    }
    
    ngOnDestroy() {
    }
    
    shutdown() {
        this.http.post(`http://localhost:8080/shutdown`, { headers: this.getHeaders() }).subscribe(resp => {
            console.log(resp);
            this.closed=true;
            window.location.replace("https://plus.google.com/+JenyaPolischuk");
        });
    }
    
    private getHeaders() {
        const headers = new Headers();
//        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
