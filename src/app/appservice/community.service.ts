import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { Community } from './../appclass/community';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CommunityService {
    baseUrl: string = 'http://localhost:8080/api/community/'
    
    constructor(private http: Http) {}
    
    findCommunities(keyword): Observable<Community[]> {
        keyword = (keyword === null || keyword === '') ? 'аб' : keyword;
        let url: string = this.baseUrl + 'find/' + keyword;
        return this.http.get(url).map((resp: Response) => {
            let communityList: Community[] = resp.json();
            return communityList;
        });
    }
    
    getCommunity(id): Observable<Community> {
        let url: string = this.baseUrl + id;
        return this.http.get(url).map((resp: Response) => {
            let communityResponse: Community = resp.json().community;
            console.log(JSON.stringify(communityResponse));
            return communityResponse;
        });
    }
    
    getCommunityList(): Observable<Community[]> {
        return this.http.get('communities.json').map((resp: Response) => {
            let communityList: Community[] = resp.json().communities;
            return communityList;
        });
    }

}
