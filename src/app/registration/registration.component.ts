import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Citizen } from './../appclass/citizen';
import { Community } from './../appclass/community';
import { FullName } from './../appclass/fullname';
import { CitizenService } from './../appservice/citizen.service';
import { CommunityService } from './../appservice/community.service';
import { Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { AppComponent } from './../app.component';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Component({
    selector: 'gruk-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [CitizenService, CommunityService]
})
export class RegistrationComponent implements OnInit {
    @ViewChild('myForm') form;
    @Input() app: AppComponent;
    home: boolean;
    citizen: Citizen;
    password: string;
    communities: Community[] = [];
    communityControl: FormControl;
    communityStr: string;

    constructor(private router: Router, private citizenService: CitizenService, private communityService: CommunityService) {}

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd ) {
                this.home = ('/home' === event.url || '/' === event.url);
            }
        });
        this.newCitizen();
        this.communityControl = new FormControl('аб');
        this.communityControl.valueChanges
            .debounceTime(100)
            .switchMap(nameStart => this.communityService.findCommunities(nameStart))
            .subscribe(resp => {
                this.communities = resp;
            });
    }
    
    onBlur() {
        this.communityService.findCommunities('аб').subscribe(resp => this.communities = resp);
    }

    onSubmit() {
        let community: string[] = this.communityStr.split(' (');
        let id = community[1].replace(')', '');
        this.communityService.getCommunity(id).subscribe(resp => {
            this.citizen.community = resp;
            this.citizenService.save(this.citizen, this.password).subscribe(response => {
                this.app.citizen = response.json().citizen;
                this.app.authorized = true;
                this.newCitizen();
                this.goto(this.app.citizen.id);
            });
        });
    }
    
    newCitizen() {
        if (this.form) this.form.reset();
        this.citizen = new Citizen();
        this.citizen.citizenName = new FullName();
        
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
}
