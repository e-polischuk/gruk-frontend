import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from './../appservice/community.service';
import { Community } from './../appclass/community';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
  providers: [CommunityService]
})
export class CommunityComponent implements OnInit {

    community: Community;

    constructor(private communityService: CommunityService, private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        let params: any = this.activatedRoute.snapshot.params;
        this.communityService.getCommunity(params.id).subscribe(resp => {
            this.community = resp;
            console.log(this.community);
        });
    }

}
