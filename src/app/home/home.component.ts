import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'gruk-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    fullImagePath: string;

    constructor() {
        this.fullImagePath = './../../assets/gruk.png'
    }

    ngOnInit() {
    }

}
