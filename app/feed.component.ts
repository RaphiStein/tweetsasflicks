import {Component} from 'angular2/core'
import {TwitterService} from './twitter.service'
import {FlickrService} from './flickr.service'

@Component({
    selector: 'feed',
    templateUrl: './app/feed.html',
    providers: [TwitterService, FlickrService]
})
export class FeedComponent {
    greet: string = "Hello sir";
    flickrData; 
    data;
    
    constructor(twitterService: TwitterService, flickrService: FlickrService){
        this.data = twitterService.getTweets();
        this.flickrData = flickrService;
        console.log(this.data);
    }
}