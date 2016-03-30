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
    
    constructor(twitterService: TwitterService, flickrService: FlickrService){
        var data = twitterService.getTweets();
        // Create TwitterData from Tweets
        for (var tweet in data){
            console.log("Tweet");
            //console.log(data[tweet]);
            var flickerItem : FlickrData = new FlickrData("hashtag");
            var twitterItem : TwitterData = new TwitterData(data[tweet]["user"], data[tweet]["text"]);
            
            console.log(twitterItem);
            var feedItem: FeedItem = new FeedItem(twitterItem, flickerItem);
            this.data.push(feedItem);
        }
        
        // Get Flickr Data for each Tweet
        
        console.log(this.data);
        
        var self = this;
        setTimeout(function() {
            alert("Should change...");
            console.log(self.data);
            self.data[0].twitterItem.content = "Changed!!";
        }, 3000)
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