import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Dialog } from './../appclass/dialog';
import { Message } from './../appclass/message';

@Injectable()
export class DialogService {
    private baseUrl = 'http://localhost:8080/api/msg';
    
    constructor(private http: Http) { }
    
    getDialog(key: string, red: boolean, sender: number): Observable<Response> {
        return this.http.post(`${this.baseUrl}/dialog`, {pairKey: key, isRed: red, senderId: sender}, { headers: this.getHeaders() });
    }
    
    getDialogs(id: number, keys: string): Observable<Response> {
        return this.http.post(`${this.baseUrl}/dialogs`, {holder: id, pairKeys: keys}, { headers: this.getHeaders() });
    }
    
    sendMessage(msg: Message): Observable<Response> {
        return this.http.post(`${this.baseUrl}/send`, JSON.stringify(msg), { headers: this.getHeaders() });
    }
    
    deleteMessage(id: number, sender: number): Observable<Response> {
        return this.http.post(`${this.baseUrl}/deleteMsg`, {messageId: id, holder: sender}, { headers: this.getHeaders() });
    }
    
    countUnred(id: number): Observable<Response> {
        return this.http.get(`${this.baseUrl}/count/${id}`, { headers: this.getHeaders() });
    }
    
    getDialogKeys(id: number): Observable<Response> {
        return this.http.post(`${this.baseUrl}/dialogKeys`, id, { headers: this.getHeaders() });
    }
    
    private getHeaders() {
        const headers = new Headers();
//        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return headers;
    }

}
