instruction for running this project
clone the project
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
$ mongoimport -db genomernai -c usercollection --jsonArray < ./mongo-data/userdata.txt
```


