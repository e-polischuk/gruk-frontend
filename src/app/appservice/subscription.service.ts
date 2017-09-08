import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Citizen } from './../appclass/citizen';
import { Subscription } from './../appclass/subscription';
import 'rxjs/add/operator/map';

@Injectable()
export class SubscriptionService {
    private baseUrl = 'http://localhost:8080/api/subscript';

    constructor(private http: Http) { }
    
    subscriptionsOf(id: number) {
        return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
    }
    
    createSubscript(ids: number[]) {
        return this.http.post(`${this.baseUrl}/new`, ids, { headers: this.getHeaders() });
    }

    updateSubscript(subscript: Subscription) {
        return this.http.put(`${this.baseUrl}/update`, JSON.stringify(subscript), { headers: this.getHeaders() });
    }
    
    deleteSubscript(subscript: Subscription) {
        return this.http.delete(`${this.baseUrl}/delete`, new RequestOptions({ body: JSON.stringify(subscript), headers: this.getHeaders() }));
    }
    
    getSubscribers(id: number): Observable<Response> {
        return this.http.get(`${this.baseUrl}/to/${id}`, { headers: this.getHeaders() });
    }
    
    getSubscribeds(id: number): Observable<Response> {
        return this.http.get(`${this.baseUrl}/of/${id}`, { headers: this.getHeaders() });
    }

    private getHeaders() {
        const headers = new Headers();
        //headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }

}
