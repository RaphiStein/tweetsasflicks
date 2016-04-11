System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1, Rx_1;
    var FlickrService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            FlickrService = (function () {
                function FlickrService(http) {
                    this.http = http;
                    this.flickrAPI = {
                        fetchImagesByTag: 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=112520de0d09437b543a5c72224cd680&per_page=1&sort=relevance&format=json&nojsoncallback=?&text=',
                        //e.g. https://farm2.staticflickr.com/1545/25467059514_e7f5a34a3d_n.jpg
                        fetchImageById: {
                            part1: "https://farm",
                            part2: ".staticflickr.com/",
                            part3: "/",
                            part4: "_",
                            part5: "_n.jpg",
                        }
                    };
                    this.httpService = http;
                }
                /**
                 * Gets Flickr images for a hashtag and returns urls for these images
                 * @returns urls for use in img tags
                 */
                FlickrService.prototype.getImage = function (imageUrl) {
                    //console.log("Fetching from " + imageUrl);
                    var _this = this;
                    return this.httpService.get(imageUrl)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (res) { return res.photos.photo[0]; })
                        .map(function (res) { return _this.generateImageUrl(res); });
                };
                FlickrService.prototype.getImages = function (hashtags) {
                    var arrayOfObservables = [];
                    for (var hashtag in hashtags) {
                        //console.log(this.flickrAPI.fetchImagesByTag);
                        //console.log(hashtags[hashtag]);
                        var url = this.flickrAPI.fetchImagesByTag + "" + hashtags[hashtag].text;
                        var query = this.getImage(url);
                        arrayOfObservables.push(query);
                    }
                    console.log(arrayOfObservables);
                    return Rx_1.Observable.forkJoin(arrayOfObservables);
                };
                FlickrService.prototype.generateImageUrl = function (imgData) {
                    if (imgData) {
                        return this.flickrAPI.fetchImageById.part1 + imgData.farm + this.flickrAPI.fetchImageById.part2 + imgData.server + this.flickrAPI.fetchImageById.part3 + imgData.id + this.flickrAPI.fetchImageById.part4 + imgData.secret + this.flickrAPI.fetchImageById.part5;
                    }
                    else {
                        console.log("No Image Data Returned");
                        return "404";
                    }
                };
                FlickrService.prototype.getImagesMock = function (hashtag) {
                    /*
                    console.log(hashtag)
                    var url;
                    
                    if (hashtag == 'Montreal'){
                        url = './app/mock-data/sample-flicks-imgsA.json'
                    }
                    else {
                        url = './app/mock-data/sample-flicks-imgsB.json'
                    }
                    */
                    return this.http.get("")
                        .map(function (res) { return res.json(); })
                        .map(function (res) {
                        res = res.json().photos;
                        console.log(res);
                        return res;
                    });
                };
                FlickrService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], FlickrService);
                return FlickrService;
            }());
            exports_1("FlickrService", FlickrService);
        }
    }
});
//# sourceMappingURL=flickr.service.js.map