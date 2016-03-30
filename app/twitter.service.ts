import {Injectable} from 'angular2/core';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class TwitterService{
    tweets: {}[];

    constructor(private http:Http) {
    }
        
    getTweets(){
        console.log(this.http);
        return this.http.get('./app/sample-tweets.json')
        .map(res => res.json());
    }
    
    
}