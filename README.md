# Liri Bot App

 **LIRI** is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


# Files included



## .gitignore
Ensures that private info won't be tracked & uploaded to GitHub

## .env

This file will be used by the **dotenv** package to set what are known as environment variables to the global process.env object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to GitHub — keeping our API key information private.

## package & package-lock JSON files
Dependencies from each node package installed.

## keys.js & random.txt
**Keys.js** stores Spotify & Twitter API keys as variables; referenced within the **liri.js** file; **random.txt** stores information that will be read by the **liri.js** file during the *do-what-it-says* argument. 


## liri.js

This is where the magic happens. Within this file is the code necessary to pull data from the Twitter, Spotify, & OMDB API's, as well as to read and utilize text from the **random.txt** file. In order to get started with this application, you must open **liri.js** in your bash/terminal and pass in one of the following parameters: *spotify-this-song*, *movie-this*, *myTweets*, *do-what-it-says*. If you use the first two parameters, you may also pass in a second argument, which can be a song name or a film name (respectively). The *myTweets* parameter pulls the most recent tweets from my super important Twitter account, and *do-what-it-says* pulls information from a .txt file and interacts with said information. Pretty cool, huh?
