export module DataTypes {
    export class FeedItem {
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
    export class TwitterData {
        user: string;
        content: string;

        constructor(user: string, content: string) {
            this.user = user;
            this.content = content;
        }
    }
    export class FlickrData {
        user: string;
        imgUrls: string[];
        //imgUrl: string;

        constructor(user: string, img: string[]) {
            this.user = user;
            this.imgUrls = img;
        }
    }
    export interface HashtagObj {
        text: string;
    }
}