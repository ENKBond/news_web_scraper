# BBC News Web Scraper

BBC News Web Scraper is a site that allows the user to scrape the articles from BBC News, save them to a database,  and make notes on each article. 

The application uses the Axios and Cheerio NPM packages to scrape the BBC News website and saves the scraped articles into a MongoDB database. Pages are rendered using Express-Handlebars.

## Accessing the App

The app can be accessed either via Heroku or cloned from Git.

From Heroku: 
https://bbc-news-mongo-scraper.herokuapp.com/

Set Up Locally:

* Clone the repo from the following link: https://github.com/ENKBond/news_web_scraper
* Install all required NPM packages
* Start the application using the command line  node server.js

## Technology Used

* Node.js
* Mongo DB
* Mongoose
* Express
* Express-Handlebars
* Cheerio
* Axios