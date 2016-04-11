System.register(['angular2/core', '../twitter.service', '../flickr.service', 'angular2/http', '../datatypes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, twitter_service_1, flickr_service_1, http_1, datatypes_1;
    var FeedComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (twitter_service_1_1) {
                twitter_service_1 = twitter_service_1_1;
            },
            function (flickr_service_1_1) {
                flickr_service_1 = flickr_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (datatypes_1_1) {
                datatypes_1 = datatypes_1_1;
            }],
        execute: function() {
            FeedComponent = (function () {
                function FeedComponent(twitterService, flickrService) {
                    this.feedItems = [];
                    this.twitterService = twitterService;
                    this.flickrService = flickrService;
                    this.hashtagInput = "Canada";
                    this.onSubmit();
                }
                FeedComponent.prototype.onSubmit = function () {
                    var _this = this;
                    console.log("Searching tweets with hashtag ", this.hashtagInput);
                    // First, clear FeedItems
                    this.feedItems = [];
                    var tweets$ = this.twitterService.getTweets(this.hashtagInput);
                    tweets$.subscribe(function (tweets) {
                        console.log("Tweets Retreived:", tweets);
                        for (var i in tweets) {
                            var hashtags = tweets[i].entities.hashtags;
                            var flicks$ = _this.flickrService.getImages(hashtags);
                            _this.subscribeToFlicks(flicks$, tweets[i]);
                        }
                    });
                };
                FeedComponent.prototype.subscribeToFlicks = function (flicks$, tweet) {
                    var _this = this;
                    flicks$.subscribe(function (results) {
                        //console.log("Subscription Received: ", tweet, results);
                        var twitterItem = new datatypes_1.DataTypes.TwitterData(tweet.user, tweet.text);
                        var flickrUser = null;
                        var flickrItem = new datatypes_1.DataTypes.FlickrData(flickrUser, results);
                        var feedItem = new datatypes_1.DataTypes.FeedItem(twitterItem, flickrItem);
                        _this.feedItems.push(feedItem);
                    });
                };
                FeedComponent = __decorate([
                    core_1.Component({
                        selector: 'feed',
                        templateUrl: 'tweetsasflicks/app/feed-component/feed.html',
                        providers: [twitter_service_1.TwitterService, flickr_service_1.FlickrService, http_1.Jsonp, http_1.JSONP_PROVIDERS, http_1.ConnectionBackend]
                    }), 
                    __metadata('design:paramtypes', [twitter_service_1.TwitterService, flickr_service_1.FlickrService])
                ], FeedComponent);
                return FeedComponent;
            }());
            exports_1("FeedComponent", FeedComponent);
        }
    }
});
//# sourceMappingURL=feed.component.js.map