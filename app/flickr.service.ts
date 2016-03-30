import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class FlickrService {
    httpService;
    flickrData;

    constructor(public http: Http) {
        this.httpService = http;
    }

    /**
     * Gets Flickr images for a hashtag and returns urls for these images
     * @returns urls for use in img tags
     */
    getImages(hashtag: string[]) {
        var flickrAPI = {
            fetchImagesByTag: 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=112520de0d09437b543a5c72224cd680&per_page=1&format=json&tags=',
            //e.g. https://farm2.staticflickr.com/1545/25467059514_e7f5a34a3d_n.jpg
            fetchImageById: {
                part1: "https://farm",
                part2: ".staticflickr.com/",
                part3: "/",
                part4: "_",
                part5: "_n", //small image 
                part6: ".jpg"
            }
        };
        
        // Get Images for tag
        // Construct url 
        var imagesurl = flickrAPI.fetchImagesByTag + hashtag[0];
        return this.httpService.get(imagesurl).map(res => res.json());
        
    }
}