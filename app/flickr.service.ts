import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class FlickrService {
    httpService;
    flickrData;

    flickrAPI = {
        fetchImagesByTag: 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=112520de0d09437b543a5c72224cd680&per_page=1&sort=relevance&format=json&nojsoncallback=?&text=',
        //e.g. https://farm2.staticflickr.com/1545/25467059514_e7f5a34a3d_n.jpg
        fetchImageById: {
            part1: "https://farm",
            part2: ".staticflickr.com/",
            part3: "/",
            part4: "_",
            part5: "_n.jpg", //small image 
        }
    };

    constructor(public http: Http) {
        this.httpService = http;
    }

    /**
     * Gets Flickr images for a hashtag and returns urls for these images
     * @returns urls for use in img tags
     */
    getImage(imageUrl: string) {
        
        console.log("Fetching from " + imageUrl);

        return Observable.create((o) => {
            this.httpService.get(imageUrl)
            .map(res => {
                return res.json();
            })
            .map(res => res.photos.photo[0])
            .subscribe((result) => {
                console.log(this.generateImageUrl(result));
                o.next(this.generateImageUrl(result));
            });
        });
    }
    
    getImages(hashtags:string[]){
        var arrayOfObservables = [];
        for (var hashtag in hashtags){
            var url = this.flickrAPI.fetchImagesByTag + hashtags[hashtag];
            var query = this.getImage(url);
            arrayOfObservables.push(query);
        }
        console.log(arrayOfObservables);
        return Observable.forkJoin(arrayOfObservables, function(){
            console.log("Fork Join Done");
            return "from Fork Join with love";
        });
    }
    
    generateImageUrl(imgData) {
        return this.flickrAPI.fetchImageById.part1 + imgData.farm + this.flickrAPI.fetchImageById.part2 + imgData.server + this.flickrAPI.fetchImageById.part3 + imgData.id + this.flickrAPI.fetchImageById.part4 + imgData.secret + this.flickrAPI.fetchImageById.part5;
    }

    getImagesMock(hashtag: string) {
        /*
        console.log(hashtag)
        var url; 
        
        if (hashtag == 'Montreal'){
            url = './app/sample-flicks-imgsA.json'
        }
        else {
            url = './app/sample-flicks-imgsB.json'
        }
        */
        return this.http.get("")
            .map(res => res.json())
            .map(res => {
                res = res.json().photos;
                console.log(res);
                return res;
            });
    }
}