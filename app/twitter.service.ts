import {Injectable} from 'angular2/core';
import {Http, Headers, Jsonp, JSONP_PROVIDERS, RequestOptionsArgs, RequestOptions, Response, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class TwitterService {
    tweets: {}[];

    constructor(private http: Http, private jsonp:Jsonp) {
    }

    /*
    getTweets(hashtag: string) {
        var url = "";
        if (hashtag == 'Canada') {
            url = './app/mock-data/sample-tweetsA.json';
        }
        else if (hashtag == 'USA') {
            url = './app/mock-data/sample-tweetsB.json';
        }
        return this.http.get(url)
            .map(res => res.json());
    }
    */
    
    getTweets(hashtag : string){
        var url = 'https://soen487projectproxy.herokuapp.com/gettweetsbyhashtag/?hashtag=' + hashtag;
        
        return this.http.get(url)
        .map(res => {
            res = res.json();
            console.log(res);
            //console.log(res);
            return res.statuses;
        });
    }
}