the genomernai mysql to json converter (e.g. for mongodb) is heavily based on the following:

http://tamas.io/converting-your-data-from-mysql-to-mongodb/

but this was based on php, so I rewrote it for perl usage.

How to use it, one need at least the mysql client plus development files (dyn libs)

* install mysql client and dev files for your OS
* install perl mysql functionalities (DB::mysql) using cpan

```bash
$ sudo su
$ perl -MCPAN -e shell
cpan>o conf prerequisites_policy follow
cpan> o conf commitcpan> o conf prerequisites_policy 'follow'
cpan> o conf build_requires_install_policy yes
cpan> o conf commit
cpan>install Bundle::CPAN
cpan>q
```

now install perl dbi and mysql (its important that you have mysql dynlibs and headers installed
(please note on Mac Os X Mavericks there is a bug in finding proper dynlib, use this link to resolve problems
before installing DBD::mysql: http://www.simon.me.uk/2014/703_installing_dbd_mysql_mavericks)

```bash
$ perl -MCPAN -e shell
cpan>install DBI
cpan>install DBD::mysql
cpan>q
```

now everything is set up for conversion of mysql to mongodb tables!
We need this basic script
```bash
$ vi convert_sql_to_json.pl
```

now run a conversion, here is the syntax:
```bash
usage ./convert_sql_to_mongo.pl <db user> <db name> <dp passwd> <db_host> <db_port> <output file> <sql statement>
```

e.g.
```bash
perl ./convert_sql_to_mongo.pl myDatabaseUsername myDatabase myHiddenPassword b110-intsrv 3306 \
mongodb-import/dataBaseExport.json \
"SELECT id, screenTitle, publicationTitle, authors, publicationYear, pubmedId, organismId, screenType, bioSource, \
bioModel, assay, assayMethod, libraryManufacturer, library, scope, reagentType, scoreType, scoreCutoff, notes, \
abstractText, imageBase, stableId, libraryId \
FROM NewExternalExperiment"
```

now import into mongodb, open the daemon

```bash
mongod --dbpath=./mongo-data
```

in another window mass import

```bash
for db in mongodb-import/*.json
do
   mongoimport --db myTestdatabase --collection `basename $db .json` $db --jsonArray
done
```


