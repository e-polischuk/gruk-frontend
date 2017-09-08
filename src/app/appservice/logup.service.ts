import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Citizen } from './../appclass/citizen';
import { FullName } from './../appclass/fullname';

@Injectable()
export class LogupService {
    private citizenSource: Subject<Citizen> = new Subject<Citizen>();
    private authSource: Subject<boolean> = new Subject<boolean>();
    
    constructor() {}
    
    getCitizen(): Observable<Citizen> {
        return this.citizenSource.asObservable();
    }
    
    getAuth(): Observable<boolean> {
        return this.authSource.asObservable();
    }
    
    changeCitizen(citizen: Citizen) {
        console.log("in logup: " + citizen.citizenName.secondName);
        this.citizenSource.next(citizen);
    }
    
    changeAuth(auth: boolean) {
        console.log('in logup auth = ' + auth);
        this.authSource.next(auth);
    }
    
    newCitizen() {
        console.log('before logup clearCitizen');
        let citizen: Citizen = new Citizen();
        citizen.citizenName = new FullName();
        this.citizenSource.next(citizen);
        console.log('after logup clearCitizen');
    }

}
