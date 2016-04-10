import {Component} from 'angular2/core';
import {FeedComponent} from './feed-component/feed.component'; 

@Component({
    selector: 'my-app',
    templateUrl: './app/app.html',
    directives: [FeedComponent]
})
export class AppComponent { }
