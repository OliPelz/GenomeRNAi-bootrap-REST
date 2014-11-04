how to set up a new MEAN project SKELETON
this comes from http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/ and http://thecodebarbarian.wordpress.com/2013/07/22/introduction-to-the-mean-stack-part-one-setting-up-your-tools/ 
http://webapplog.com/tutorial-node-js-and-mongodb-json-rest-api-server-with-mongoskin-and-express-js/

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
    "mongoose": "*"
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


now lets install angularjs into our project (therefore we need bower)
```bash
npm install bower -g

```
change install path for bower so that we can directly use installations in our client side javascrpt

```bash
cd <project path>
mkdir public/javascripts/vendor
echo "{ "directory" : "public/javascripts/vendor" }" > .bowerrc
```

finally get angularjs

```bash
bower install angular#1.3.1
```
Install angulars ng-resource to make easy ajax/REST calls
```bash
bower install angular-resource
```

Install AngularJS’s end-to-end test runner
```bash
bower install angular-scenario
#npm install -g protractor ???

create a test runner and test script (for client tests)
```bash
mkdir -p  public/tests/e2e
vi public/tests/e2e/runner.html
```
put in content
```bash
<!doctype html>
<html lang="en">
 <head>
 <title>End2end Test Runner</title>
 <script src="/javascripts/vendor/angular-scenario/angular-scenario.js" ng-autotest></script>
 <script src="scenarios.js"></script>
 </head>
 <body>
 </body>
</html>
```
create the underlying scenarios js
vi  public/tests/e2e/scenarios.js
```bash
'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Todo list', function() {
 beforeEach(function() {
 browser().navigateTo('/');
 sleep(1);
 });

 it("should move todo to correct list when user toggles checkbox", function() {
 expect(repeater('.not-done').count()).toBe(2);
 expect(repeater('.done').count()).toBe(1);

 element('.not-done:nth-child(1) input').click();
```

```
on the server side install nodeunit for unit testing (here: a basic unit test for seeing if REST is working)
```bash
npm install -g nodeunit
```

create a testfile for nodeunit
```bash
cd <projectdir>
mkdir nodeunit
vi nodeunit/routes.index.test.js
```


now install bootstrap for our css for nice styling

```bash
bower install bootstrap-css
bower install bootstrap-javascript
```

create mongodb database and start the daemon
```bash
mkdir ./mongodb-data
mongod --dbpath ./data/
```
to create an angular js controller and stuff
```bash
mkdir -p public/javascripts/controllers
vi public/javascripts/controllers/TodoListController.js

put in some code e.g.:

-function TodoListController($scope) {
+function TodoListController($scope, $http) {
$scope.todos = [];
+ $scope.newTodo = {
+ done : false,
+ due : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
+ description : ''
+ };
$scope.doneFilter = { done : true };
$scope.notDoneFilter = { done : false };
@@ -7,4 +12,11 @@ function TodoListController($scope) {
$scope.setTodos = function(todos) {
$scope.todos = todos;
};
+
+ $scope.addNewTodo = function() {
+ $http.post('/todo.json', $scope.newTodo).success(function(data) {
+ $scope.todos = data.todos;
+ $scope.newTodo.description = '';
+ });
+ };

```
than the angular jade markup
vi views/index.jade
```bash
block content
div.container(ng-controller="TodoListController", ng-init="setTodos( #{JSON.stringify(todos)} )")
h1 My Todo List
 h2 Add New
 form(novalidate, ng-submit="addNewTodo()")
 textarea( ng-model="newTodo.description",
 placeholder="Description")
 br
 button.btn.btn-primary(type="submit") Add Todo
h2 Upcoming
div
div.row.todo.not-done(ng-repeat="todo in todos | filter:notDoneFilter")
```


now start
```bash
npm start
```

unit test server side (e.g. rest services)
```bash
nodeunit nodeunit/*
```
better testing
```bash
npm install mocha@1.18.2 --save-dev
$ npm install expect.js@0.3.1 --save-dev 
$ npm install superagent@0.17.0 --save-dev
```

now the lifecycle should be:
* start to build the server side unit tests - nodetests
* than the server side implementation
* than the client side angularjs tests
* than the client side angularjs unit tests


e.g. start with the RESTful service tests 

