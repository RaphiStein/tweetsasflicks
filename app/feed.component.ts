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
    
    data: FeedItem[] = [];
    flickrData;
    
    constructor(twitterService: TwitterService, flickrService: FlickrService){
        var data = twitterService.getTweets();
        // Create TwitterData from Tweets
        for (var tweet in data){
            console.log("Tweet");
            //console.log(data[tweet]);
            var twitterItem : TwitterData = new TwitterData(data[tweet]["user"], data[tweet]["text"]);
            console.log(twitterItem);
            var feedItem: FeedItem = new FeedItem(twitterItem, null);
            this.data.push(feedItem);
        }
        
        this.flickrData = flickrService;
        console.log(this.data);
    }
}

class TwitterData {
    user: string;
    content: string;
    
    constructor(user: string, content: string){
        this.user = user;
        this.content = content;
    }
}
class FlickrData {
    user: string;
    img: string;
}
class FeedItem {
    twitterItem: TwitterData;
    flickrItem: FlickrData;
    
    constructor(twitItem: TwitterData, flickItem: FlickrData){
        this.twitterItem = twitItem;
        this.flickrItem = flickItem;
    }
}