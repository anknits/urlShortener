# urlShortener
An app to shorten urls

 This application is built on the MERN stack. MERN is an acronym for MongoDB, Express, NodeJS and ReactJS. 
 The purpose of this app is to convert long urls into short urls that can be shared with others.
 
 If you are looking to run the app locally, all you need to do is fork / clone the app and create a nodemon.json file in the root folder (urlShortener).
 In this file create a variable named mongodbConnectionString under an env variable with the value of your actual mongodb connection string, whether local, on-prem or on cloud.
 The file contents could look something like the following incase you are using the online db service https://www.mongodb.com/:
 
 {
  "env": {
    "mongodbConnectionString": "mongodb+srv://{username}:{password}@cluster0.bqjwx.mongodb.net/{dbname}?retryWrites=true&w=majority"
  }
 }
 
 To start the server, enter the following command into the terminal from the base directory of the project:
 npm run devStart
 
 Direct Dependencies:
 1. express: used for routing
 2. mongoose: used for creating model
 3. shortid: used for generating random short unique ids
 
 Dev Dependency:
 1. nodemon: used to restart server automatically on saving changes
 
 A word of caution!
 
 This app is not for production usage. Although shortid is known to be quite reliable in generating unique ids to the extent of millions per day even after app restarts,
 there is no guarantee generated ids would be unique. As such, refrain from using this app as is into production environments.
