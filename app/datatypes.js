System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DataTypes;
    return {
        setters:[],
        execute: function() {
            (function (DataTypes) {
                var FeedItem = (function () {
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
                DataTypes.FeedItem = FeedItem;
                var TwitterData = (function () {
                    function TwitterData(user, content) {
                        this.user = user;
                        this.content = content;
                    }
                    return TwitterData;
                }());
                DataTypes.TwitterData = TwitterData;
                var FlickrData = (function () {
                    //imgUrl: string;
                    function FlickrData(user, img) {
                        this.user = user;
                        this.imgUrls = img;
                    }
                    return FlickrData;
                }());
                DataTypes.FlickrData = FlickrData;
            })(DataTypes = DataTypes || (DataTypes = {}));
            exports_1("DataTypes", DataTypes);
        }
    }
});
//# sourceMappingURL=datatypes.js.map