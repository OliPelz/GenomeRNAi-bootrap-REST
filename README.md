how to set up
install node.js for your OS using http://nodejs.org, than
install express
```bash
$ npm install -g express
$ npm install -g express-generator
```

now install mongodb for your OS using: https://www.mongodb.org/downloads
```bash

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

now create a data dir for mongo db data
```bash
mkdir data
```

start new wep app
npm start
now browse to 
http://localhost:3000