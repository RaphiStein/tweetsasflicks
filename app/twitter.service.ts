export class TwitterService {
    tweets: {}[];

    getTweets(): {}[] {
        this.tweets = [
            {
                text: "I love #Montreal", entities: {
                    hashtags: [
                        {
                            text: 'Montreal'
                        }]
                }
            },
            {
                text: "I love #Toronto", entities: {
                    hashtags: [
                        {
                            text: 'Toronto'
                        }]
                }
            },
        ];

        return this.tweets;
    }
}