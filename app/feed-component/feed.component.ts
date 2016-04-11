import {Component} from 'angular2/core';
import {TwitterService} from '../twitter.service';
import {FlickrService} from '../flickr.service';
import {Observable} from 'rxjs/Rx';
import {Jsonp, JSONP_PROVIDERS, ConnectionBackend} from 'angular2/http';
// Data
import {DataTypes} from '../datatypes';

@Component({
    selector: 'feed',
    templateUrl: 'tweetsasflicks/app/feed-component/feed.html',
    providers: [TwitterService, FlickrService, Jsonp, JSONP_PROVIDERS, ConnectionBackend]
})
export class FeedComponent {
    hashtagInput: string;

    twitterService: TwitterService;
    flickrService: FlickrService;

    feedItems: DataTypes.FeedItem[] = [];


    constructor(twitterService: TwitterService, flickrService: FlickrService) {
        this.twitterService = twitterService;
        this.flickrService = flickrService;

        this.hashtagInput = "Canada";
        this.onSubmit();
    }

    onSubmit() {
        console.log("Searching tweets with hashtag ", this.hashtagInput);
        // First, clear FeedItems
        this.feedItems = [];

        var tweets$ = this.twitterService.getTweets(this.hashtagInput);

        tweets$.subscribe((tweets) => {
            console.log("Tweets Retreived:", tweets);
            for (var i in tweets) {
                var hashtags = tweets[i].entities.hashtags;
                var flicks$ = this.flickrService.getImages(hashtags);
                this.subscribeToFlicks(flicks$, tweets[i]);
            }
        });
    }
    
    
    private subscribeToFlicks(flicks$, tweet) {
        flicks$.subscribe((results) => {

            //console.log("Subscription Received: ", tweet, results);
            
            var twitterItem = new DataTypes.TwitterData(tweet.user, tweet.text);
            
            var flickrUser = null;
            var flickrItem = new DataTypes.FlickrData(flickrUser, results);

            var feedItem = new DataTypes.FeedItem(twitterItem, flickrItem);

            this.feedItems.push(feedItem);
        });
    }
}
