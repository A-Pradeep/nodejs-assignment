# Node JS assignment
===========================

## Available Endpoints

- > GET 
http://localhost:3001/console/  -  Return all books and magazines
- > GET
http://localhost:3001/console/sort  -  Return all books and magazines by sort
- > GET
http://localhost:3001/console/search?type=isbn&data=1024-5245-8584   -  Find book or magazine by ISBN
- > GET
http://localhost:3001/console/search?type=authors&data=null-walter@echocat.org  -  Find books and magazines by authors’email
- > POST
http://localhost:3001/console/add       -  Add new book and magazine
```
headers: { 
    'content-type': 'application/json', 
    'update-data': 'true',    // if need to update the global data 
    'user-agent': 'vscode-restclient'
  },
```

## Server : npm start
## Dev server : npm run dev
