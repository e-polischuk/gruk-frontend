import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'gruk-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    fullImagePath: string;
    name: string;

    constructor() {
        this.fullImagePath = './../../assets/grk.png';
    }

    ngOnInit() {
    }

}
