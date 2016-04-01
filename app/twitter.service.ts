import {Injectable} from 'angular2/core';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class TwitterService {
    tweets: {}[];

    constructor(private http: Http) {
    }

    getTweets(hashtag: string) {
        var url = "";
        if (hashtag == 'Canada') {
            url = './app/sample-tweetsA.json';
        }
        else if (hashtag == 'USA') {
            url = './app/sample-tweetsB.json';
        }
        return this.http.get(url)
            .map(res => res.json());
    }
}