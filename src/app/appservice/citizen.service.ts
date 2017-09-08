import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Citizen } from './../appclass/citizen';
import { Subscription } from './../appclass/subscription';
import 'rxjs/add/operator/map';

@Injectable()
export class CitizenService {
    private baseUrl = 'http://localhost:8080/api';

    constructor(private http: Http) {}

    save(ctzn: Citizen, pwd: string): Observable<Response> {
        console.log("CITIZED: " + JSON.stringify(ctzn));
        console.log("PASSWORD: " + pwd);
        return this.http.post(`${this.baseUrl}/registration`, {citizen: ctzn, password: pwd}, { headers: this.getHeaders() });
    }
    
    logIn(mail: string, pwd: string): Observable<Response> {
        return this.http.post(`${this.baseUrl}/login`, {email: mail, password: pwd}, { headers: this.getHeaders() });
    }
    
    getCitizen(id: number): Observable<Response> {
        return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
    }
    
    getReceiver(pairKey, id): Observable<Citizen> {
        return this.http.get(`${this.baseUrl}/receiver/${pairKey}/${id}`).map((resp: Response) => { 
                    let receiver: Citizen = resp.json().citizen;
                    return receiver;
                });
    }
    
    searchFriends(id: number): Observable<Response> {
        return this.http.get(`${this.baseUrl}/citizens/${id}`, { headers: this.getHeaders() });
    }
    
    keyOf(id1: number, id2: number): Observable<Response> {
        return this.http.get(`${this.baseUrl}/keyOf/${id1}/${id2}`, { headers: this.getHeaders() });
    }

    private getHeaders() {
        const headers = new Headers();
//        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}
