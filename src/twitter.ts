import { Scraper } from 'agent-twitter-client';

const scraper = new Scraper();

// Add Twitter API credentials and other necessary code here

// Login to Twitter
async function login() {
  try {
    await scraper.login('username', 'password');
    console.log('Logged in successfully');
  } catch (err: unknown) {
    console.error('Error logging in:', err);
  }
}

login();

// Get tweets from a user
async function fetchTweets() {
  try {
    const tweets: any[] = [];
    for await (const tweet of scraper.getTweets('twitterdev', 10)) {
      tweets.push(tweet);
    }
    console.log('Tweets:', tweets);
  } catch (err: unknown) {
    console.error('Error getting tweets:', err);
  }
}

fetchTweets();