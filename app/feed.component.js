System.register(['angular2/core', './twitter.service', './flickr.service'], function(exports_1, context_1) {
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
    var core_1, twitter_service_1, flickr_service_1;
    var FeedComponent, TwitterData, FlickrData, FeedItem;
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
                    // First, clear FeedItems
                    this.feedItems = [];
                    var tweets$ = this.twitterService.getTweets(this.hashtagInput);
                    tweets$.subscribe(function (tweets) {
                        for (var i in tweets) {
                            var hashtags = tweets[i].entities.hashtags;
                            var flicks$ = _this.flickrService.getImages(hashtags);
                            _this.subscribeToFlicks(flicks$, tweets[i]);
                        }
                    });
                };
                FeedComponent.prototype.subscribeToFlicks = function (flicks$, tweet) {
                    var _this = this;
                    console.log("Here");
                    flicks$.subscribe(function (results) {
                        console.log("Flickr Subscription:");
                        console.log(results);
                        var twitterItem = new TwitterData(tweet.user, tweet.text);
                        var flickrItem = new FlickrData("null", results);
                        var feedItem = new FeedItem(twitterItem, flickrItem);
                        _this.feedItems.push(feedItem);
                    });
                };
                FeedComponent = __decorate([
                    core_1.Component({
                        selector: 'feed',
                        templateUrl: './app/feed.html',
                        providers: [twitter_service_1.TwitterService, flickr_service_1.FlickrService]
                    }), 
                    __metadata('design:paramtypes', [twitter_service_1.TwitterService, flickr_service_1.FlickrService])
                ], FeedComponent);
                return FeedComponent;
            }());
            exports_1("FeedComponent", FeedComponent);
            TwitterData = (function () {
                function TwitterData(user, content) {
                    this.user = user;
                    this.content = content;
                }
                return TwitterData;
            }());
            FlickrData = (function () {
                //imgUrl: string;
                function FlickrData(user, img) {
                    this.user = user;
                    this.imgUrls = img;
                }
                return FlickrData;
            }());
            FeedItem = (function () {
                function FeedItem(twitItem, flickItem) {
                    this.twitterItem = twitItem;
                    this.flickrItem = flickItem;
                }
                FeedItem.prototype.setTwitterItem = function (twitItem) {
                    this.twitterItem = twitItem;
                };
                FeedItem.prototype.setFlickrItem = function (flickItem) {
                    this.flickrItem = flickItem;
                };
                return FeedItem;
            }());
        }
    }
});
//# sourceMappingURL=feed.component.js.map