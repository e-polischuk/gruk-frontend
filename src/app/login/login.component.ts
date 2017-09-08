import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm} from '@angular/forms';
import { FullName } from './../appclass/fullname';
import { CitizenService } from './../appservice/citizen.service';
import { Citizen } from './../appclass/citizen';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { AppComponent } from './../app.component';

@Component({
    selector: 'gruk-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [CitizenService]
})
export class LoginComponent implements OnInit {
    @ViewChild('formIn') form;
    @Input() app: AppComponent;
    email: string;
    password: string;
//    authorized: boolean = false;
    
    constructor(private router: Router, private citizenService: CitizenService) {}

    ngOnInit() {  
    }

    login() {
        console.log("LOGIN: email=" + this.email + ", password=" + this.password);
        this.citizenService.logIn(this.email, this.password).subscribe((response: Response) => {
            this.app.citizen = response.json().citizen;
            this.form.reset();
            console.log(this.app.citizen.id);
            if (this.app.citizen) {
                this.app.authorized = true;
                this.goto(this.app.citizen.id);
            }
        });
    }
    
    toCitizen() {
        this.goto(this.app.citizen.id);
    }
    
    goto(id: number) {
        if (this.router.navigated === false) {
            this.router.navigateByUrl(`/user/${id}/${id}`);
        } else {
            this.router.navigateByUrl(`/home`).then(() => {
                this.router.navigateByUrl(`/user/${id}/${id}`);
            });
        }
    }
    
    logout() {
        this.app.authorized = false;
        this.app.citizen = undefined; 
        this.router.navigateByUrl("/home");
    }
}
