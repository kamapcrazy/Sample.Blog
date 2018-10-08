import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'kamap-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

    public message: string

    constructor() { }

    ngOnInit() {
        this.message = "this is a message from app component 123"
    }
}