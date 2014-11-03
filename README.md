how to set up
install node.js for your OS using http://nodejs.org, than
install express
```bash
$ npm install -g express
$ npm install -g express-generator
```

now install mongodb for your OS using: https://www.mongodb.org/downloads
```bash
cp ~/Downloads/mongodb-xxx/bin/* /usr/bin
```

create express webapp

```bash
$ express genomernai-express-test
```


add mongodb dependancies


```bash
$ vi genomernai-express-test/package.json
```

add dependencies to "dependencies" properties (important the comma in the line before the import)

```bash
"dependencies": {
    ...
    "jade": "~1.6.0",
    "mongodb": "*",
    "monk": "*"
}
```

now app has been built


start new wep app
npm start
now browse to 
http://localhost:3000

now go back to the app folder in a shell where you started the express server
now create a data dir for mongo db database, and start the mongo db server
```bash
mkdir ./data
mongod --dbpath ./data/
```
it should say in one of the last lines
```bash
waiting for connections on port 27017
```
now let the shell stay open (mongo daemon will listen on a specfic port)
now open a new one and type 
```bash
mongo
```
for accessing the mongo client.
it shoud say in one of the lines
```bash
connecting to: test
```
in your mongod (server) shell there will pop up then
```bash
2014-10-31T16:29:47.174+0100 [initandlisten] connection accepted from 127.0.0.1:64011 #1 (1 connection now open)

```
