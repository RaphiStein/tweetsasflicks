import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Injectable()
export class FlickrService {
    httpService;
    flickrData;

    constructor(public http: Http) {
        this.httpService = http;
        this.flickrData = this.getImages("placeholder");
    }

    getImages(hashtag: string) {
        this.httpService.get('http://jsonplaceholder.typicode.com/posts')
            .subscribe(function(res) {
                this.flickrData = res;
            });
        return this.flickrData;
    }
}