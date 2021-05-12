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

## Mongo Collection Schema
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