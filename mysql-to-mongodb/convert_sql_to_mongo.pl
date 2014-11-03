#!/usr/bin/perl
use DBI;
use DBD::mysql;
use JSON;
use strict;
use warnings;

#usage ./convert_sql_to_mongo.pl <db user> <db name> <dp passwd> <db_host> <db_port> <output file> <sql statement>
#e.g. 
#connect to database
my ($db_user, $db_name, $db_pass, $db_host, $db_port) = ($ARGV[0], $ARGV[1],$ARGV[2],$ARGV[3],"3306");
my $dbh = DBI->connect("DBI:mysql:$db_name;host=$db_host;port=$db_port","$db_user","$db_pass")
or closeDBAndDie("Couldn't connect to database: ");

my $sql_string = $ARGV[4];

my $out_handle;
open($out_handle, ">", $ARGV[5]) || die "cannot open output file ".$ARGV[5];

###set encoding 'n stuff
my $sth = $dbh->prepare("SET NAMES 'utf8'")
or closeDBAndDie("Couldn't prepare statement");
$sth->execute() or closeDBAndDie("Couldn't connect to database: ");
$sth = $dbh->prepare("SET FOREIGN_KEY_CHECKS=0")
or closeDBAndDie("Couldn't prepare statement");
$sth->execute() or closeDBAndDie("Couldn't connect to database: ");

$sth = $dbh->prepare("SELECT geneId,id from Gene") or closeDBAndDie("Couldn't prepare statement");
$sth->execute() or closeDBAndDie("Couldn't connect to database: ");
my @result_rows;
while (my @arr = $sth->fetchrow_array) {
    push @result_rows, \@arr;
}
print $out_handle to_json(\@result_rows);

#while (my @arr = $sth->fetchrow_array) {
#    print $out_handle to_json(\@arr);
#}



$dbh->disconnect;
close $out_handle;



#sub to close the database handle
sub closeDBAndDie {
my $param = $_[0];
my $dbh = $_[1];
$dbh->disconnect or warn $dbh->errstr;
die $param;
}
