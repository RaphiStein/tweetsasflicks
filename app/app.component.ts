import {Component} from 'angular2/core';
import {FeedComponent} from './feed.component'; 

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App </h1> <feed></feed>',
    directives: [FeedComponent]
})
export class AppComponent { }
