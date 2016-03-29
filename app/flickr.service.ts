import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Injectable()
export class FlickrService{
    constructor(public http: Http){
        http.get('http://jsonplaceholder.typicode.com/posts')
        .subscribe(images => this.images = images);
    }
    
    getImages(){
       
    }
}