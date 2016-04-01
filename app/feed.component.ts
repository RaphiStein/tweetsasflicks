import {Component} from 'angular2/core';
import {TwitterService} from './twitter.service';
import {FlickrService} from './flickr.service';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'feed',
    templateUrl: './app/feed.html',
    providers: [TwitterService, FlickrService]
})
export class FeedComponent {
    greet: string = "Hello sir";

    twitterService: TwitterService;
    flickrService: FlickrService;

    feedItems: FeedItem[] = [];

    testing$: Observable<string[]>;

    constructor(twitterService: TwitterService, flickrService: FlickrService) {
        this.twitterService = twitterService;
        this.flickrService = flickrService;


        var tweets$ = this.twitterService.getTweets();

        tweets$.subscribe((tweets) => {
            for (var i in tweets) {
                var hashtags = tweets[i].entities.hashtags;
                for (var j in hashtags) {
                    var flicks$ = this.flickrService.getImages(hashtags[j].text);
                    this.subscribeToFlicks(flicks$, tweets[i]);
                }
            }
        });
        
        
    }
    
    subscribeToFlicks(flicks$, tweet) {
            flicks$.subscribe((results) => {
                console.log("Flickr Subscription:");
                console.log(results);
                
                var twitterItem = new TwitterData(tweet.user, tweet.text);
                var flickrItem = new FlickrData("null", results);
                
                var feedItem = new FeedItem(twitterItem, flickrItem);
                
                this.feedItems.push(feedItem);
                console.log(tweet);
                console.log(results);
            });
        }

    /*
        assembleFeed(hashtag: string) {
            // Get Tweets, and create tweetItems
            var self = this;
            this.twitterService.getTweets().subscribe(function(tweets) {
                for (var i in tweets) {
                    var feedItem: FeedItem = new FeedItem(null, null);
                    var twitterItem: TwitterData = new TwitterData(tweets[i]["user"], tweets[i]["text"]);
                    feedItem.setTwitterItem(twitterItem);
    
                    var hashtags = [];
                    for (var j in tweets[i]["entities"]["hashtags"]) {
                        hashtags.push(tweets[i]["entities"]["hashtags"][j]["text"]);
                    }
    
                    self.flickrService.getImages(["montreal"])
                        .subscribe(function(flicks) {
                            console.log(flicks);
                            var flickrImageData = {
                                farm: "",
                                server: "",
                                id: "",
                                secret: ""
                            };
                            flickrImageData.farm = flicks["photos"]["photo"][0]["farm"];
                            flickrImageData.server = flicks["photos"]["photo"][0]["server"];
                            flickrImageData.id = flicks["photos"]["photo"][0]["id"];
                            flickrImageData.secret = flicks["photos"]["photo"][0]["secret"];
    
                            var imgUrl = self.flickrService.generateImageUrl(flickrImageData);
                            var flickItem: FlickrData = new FlickrData(null, imgUrl);
    
                            feedItem.setFlickrItem(flickItem);
                            self.data.push(feedItem);
                        });
                }
    
                console.log("Tweet Data");
                console.log(tweets);
            });
            *
            // For each tweetItem, get Flickr images and create flickrItems
            // Combine tweetItem and flickrItem to Create FeedItem
            // Add feedItem to data  
        }
        */
}


class TwitterData {
    user: string;
    content: string;

    constructor(user: string, content: string) {
        this.user = user;
        this.content = content;
    }
}
class FlickrData {
    user: string;
    imgUrl: string;

    constructor(user: string, img: string) {
        this.user = user;
        this.imgUrl = img;
    }
}
class FeedItem {
    twitterItem: TwitterData;
    flickrItem: FlickrData;

    constructor(twitItem?: TwitterData, flickItem?: FlickrData) {
        this.twitterItem = twitItem;
        this.flickrItem = flickItem;
    }
    setTwitterItem(twitItem: TwitterData) {
        this.twitterItem = twitItem;
    }
    setFlickrItem(flickItem: FlickrData) {
        this.flickrItem = flickItem;
    }
}