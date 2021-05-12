## Environment setup
In backend directory, type following command
```bash
npm install
```

## Run Server
```bash
node server.js
```
The server will listen on localhost:7777


## Server api list
- /auth
    - /login
        - return jwt if success
    - /signup
        - create new user and return jwt if success
    - /reset_password
        - reset password and return jwt if success
- /user
    - /
        - GET
            - return all users
    - /:username
        - GET
        - POST
        - DELETE
    - /delete/all
        - DELETE
            - delete all users
- /history
    - /
        - Get
            - Return all user history
        - Post
            - require username and search_query in the request body
            - example http request
            ```http request
            POST http://localhost:7777/history/
            Content-Type: application/json
            
            {
            "username": "abel",
            "search_query": "HMM model"
            }```
        - /delete/all
            - delete all search history
          
## Database Collection Schema
```javascript
const UserSchema = mongoose.Schema({
    username: {
        type: String, required: true, index: {unique: true}
    },
    email: {
        type: String
    },
    phone: {
        type: String,
    },
    bio: {
        type: String
    },
    gender: {
        type: String,
    },
    password: {
        type: String
    },
    securityQuestion: {
        type: String,
    },
    securityAnswer: {
        type: String,
    },
    lastLoginTime: {
        type: Date
    },
    role: {
        type: String,   // admin, or user
        default: 'user'
    },
})

const SearchHistorySchema = mongoose.Schema({
    username: {
        type: String, required: true
    },
    search_query: {
        type: String
    },
    search_time:{
        type: Date
    }
})
```