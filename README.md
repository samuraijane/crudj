## CRUD for jQuery
CRUD for jQuery is a simple application for students learning how to create, read, update, and delete documents in a MongoDB collection using jQuery.

#### Instructions
+ `git clone` this repository to your local machine.
+ Run `npm install` to download the dependencies this application needs.
+ Create a local database in MongoDB with `mongoimport --db crudj --collection persons --drop --file ~/yourpathto/seed-data.json`. You can find this file in the folder entitled *mock-data*.
+ Start the server for the database with `mongod`.
+ In a separate terminal window, run `gulp watch` to start the node server.
+ Navigate to *localhost:3001* in a browser to begin using this application.
