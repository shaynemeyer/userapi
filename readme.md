# userapi
A user api using koajs with Nodejs and MongoDB.

## getting started

```
npm install
npm start
```

### run tests

```
npm test
```

#Install MongoDB on Mac

## Brew 

```
brew doctor
brew update
brew install mongodb
```

## Make data directory
```
sudo mkdir -p /data/db
```
## Start Mongo Service
```
sudo mongod
```
open a new terminal window

## Enter Mongo console
``` 
mongo
```
## Present databse
```
db
```
## List databases
``` 
show dbs
```

## Create new database
``` 
use users
db.users.save({name:"Shayne",age:"44",height:"70"})
```
## Query new database
```
db.users.find()
```
## delete
```
db.users.remove({username:"shayne"})
```
## Update
```
db.users.update({column:"value",column2:"value2"})
``` 