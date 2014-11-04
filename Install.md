instruction for installing this project 
this is a MEAN stack application

prequesites for MEAN (please install on your OS)
* node.js (and npm)
* mongodb
* bower (a package manager for adding client-side javascript dependancies, e.g. for installing angularjs or jquery etc. to your project)

to run tests on the commandline install nodeunit
```bash
npm install -g nodeunit
```

first git clone the project
change to project dir, type

to load all dependent libraries (this will download packages from the internet) use
```bash
$ npm install
```
then if above command was successful (internet connection required) then start the express webserver with
$ npm start

```
now run the mongo database daemon and supply a data path

```bash
$ mongod --dbpath <project dir >/data
```

import some testdata
```bash
$ mongoimport -db genomernai -c usercollection --jsonArray < ./mongo-data-create/userdata.txt
```


for testing use
```bash
$ npm install mocha --save-dev
$ npm install expect.js --save-dev 
$ npm install superagent --save-dev
```

