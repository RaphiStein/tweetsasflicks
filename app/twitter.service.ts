export class TwitterService {
    tweets: {}[];

    getTweets(): {}[] {
        this.tweets = [
            {
                user: "Adam",
                text: "I love #Montreal", 
                entities: {
                    hashtags: [
                        {
                            text: 'Montreal'
                        }]
                }
            },
            {
                user: "Eve",
                text: "I love #Toronto", 
                entities: {
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