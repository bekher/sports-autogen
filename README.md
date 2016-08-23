# Sports-Autogen
### This small webapp uses Markov chains to generate short, sound-byte post-game interviews you would hear on ESPN.

[See it live!](https://bekher.net/sports)

While watching the 2016 Olympics, I noticed that all of the athlete post-competition interviews sound very generic and similar. Generally, all post-game interviews for any sport use plenty of cliches, making it a perfect application for demonstrating the beauty of Markov chains.

*Sample output:*
> We have to shore up their offensive production. We're tickled to contain them. Execution wise we really gave it is possible. We have a tremendous work ethic. They have kept their heads up through the difficult times. We have to play with their mental toughness. They’ve come together as best and had a tough but not break. We have to stick to their bread-and-butter offense. 


## Install
`git clone https://github.com/bekher/sports-autogen`

`npm install`

## Usage
Start with:

`npm start`

If running locally, browse to localhost:3333/ to access the web UI. Browse to /gen to access the raw quote generator API.

## Cliche Sources
Sample quotes found in interviews.txt are modified or copied from the following sources:

* http://www.sportscliche.com
* http://bleacherreport.com/articles/184333-post-game-interview-sports-clichs
* Various olympic interviews and custom write-ins
