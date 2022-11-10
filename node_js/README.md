# nodeJS project

_This is the back end part of the task._
Written in plain JavaScript.

**What I used**:

- [Express](http://expressjs.com/) for api request handling and middleware
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for creating, verifying and decoding JWT tokens.
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for hashing and validating user password.

I wanted to use [MongoDB](https://www.mongodb.com/) for saving user details, but (even though I had prior experience with [dynamoDB](https://aws.amazon.com/dynamodb/)) I didn't have time to setup and use [MongoDB](https://www.mongodb.com/). I created mock database in [/database](./database/) and [helper utility file](./utils/database.js) for handling database actions
