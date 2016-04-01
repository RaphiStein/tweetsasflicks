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
    hashtagInput: string;

    twitterService: TwitterService;
    flickrService: FlickrService;

    feedItems: FeedItem[] = [];


    constructor(twitterService: TwitterService, flickrService: FlickrService) {
        this.twitterService = twitterService;
        this.flickrService = flickrService;
        
        this.hashtagInput = "Canada";
        this.onSubmit();
    }

    subscribeToFlicks(flicks$, tweet) {
        console.log("Here");
        flicks$.subscribe((results) => {
            console.log("Flickr Subscription:");
            console.log(results);

            var twitterItem = new TwitterData(tweet.user, tweet.text);
            var flickrItem = new FlickrData("null", results);

            var feedItem = new FeedItem(twitterItem, flickrItem);

            this.feedItems.push(feedItem);
        });
    }

    onSubmit() {
        // First, clear FeedItems
        this.feedItems = [];
        
        
        var tweets$ = this.twitterService.getTweets(this.hashtagInput);

        tweets$.subscribe((tweets) => {
            for (var i in tweets) {
                var hashtags = tweets[i].entities.hashtags;
                    var flicks$ = this.flickrService.getImages(hashtags);
                    this.subscribeToFlicks(flicks$, tweets[i]);
            }
        });
    }
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