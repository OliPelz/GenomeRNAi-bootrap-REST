the genomernai mysql to mongodb converter is heavily based on the following:

http://tamas.io/converting-your-data-from-mysql-to-mongodb/

but this was based on php, so I rewrote it for perl usage.

How to use it

* install mysql server and dev 
	* set up mysql root password, restrictions and security ...
* import database from flatfiles
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
```bash
$ perl -MCPAN -e shell
cpan>install DBI
cpan>install DBD::mysql
cpan>install JSON
cpan>q
```

now everything is set up for conversion of mysql to mongodb tables!
We need this basic script
```bash
$ vi convert_sql_to_mongo.pl
```

```bash
use DBI;
use DBD::mysql;
use strict;
use warnings;

#usage ./convert_sql_to_mongo.pl <db user> <db name> <dp passwd> <db_host> <db_port> <output file> <sql statement>
#e.g. 
#connect to database
my ($db_user, $db_name, $db_pass, $db_host, $db_port) = ($ARGV[1], $ARGV[2],$ARGV[3],$ARGV[4],"3306");
my $dbh = DBI->connect("DBI:mysql:$db_name;host=$db_host;port=$db_port","$db_user","$db_pass")
or closeDBAndDie("Couldn't connect to database: ");

my $sql_string = $ARGV[6];

my $out_handle;
open($out_handle, "<", $ARGV[5]) || die "cannot open output file ".$ARGV[5];

###set encoding 'n stuff
my $sth = $dbh->prepare("SET NAMES 'utf8'")
or closeDBAndDie("Couldn't prepare statement");
$sth->execute() or closeDBAndDie("Couldn't connect to database: ");
$sth = $dbh->prepare("SET FOREIGN_KEY_CHECKS=0")
or closeDBAndDie("Couldn't prepare statement");
$sth->execute() or closeDBAndDie("Couldn't connect to database: ");

$sth = $dbh->prepare("SELECT geneId,id from Gene") or closeDBAndDie("Couldn't prepare statement");
$sth->execute() or closeDBAndDie("Couldn't connect to database: ");
#my @result_rows;
#while (my @arr = $sth->fetchrow_array) {
#    push @result_rows, \@arr;
#}
#print $outhandle to_json(@resut_rows);

while (my @arr = $sth->fetchrow_array) {
    print $out_handle to_json(\@arr);
}



$dbh->disconnect;
close $out_handle;



#sub to close the database handle
sub closeDBAndDie {
my $param = $_[0];
my $dbh = $_[1];
$dbh->disconnect or warn $dbh->errstr;
die $param;
}

```
