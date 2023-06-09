# Marina-manager-backend
Backend for Marina manager app

How to start:

.env file is required to start
Run "npm i"
Run "npm run start"
About the project:

Repository pattern - Used to handle abstraction over data storage, check files that end in "...-repository.ts". It's used to keep the code structured and separate the data access logic from my app logic.

Dependency injection - Files which end in "...service.ts" are essentialy class based services. We created an instance of the class and exported it as such. NOT as a class, but as it's instance.
Example "marina-service.ts" is a class which has functions that calculate marina capacity and keep us from hitting the limit 
in our marina. That code is chunky and too large to fit into "marina-controller.ts". This way we write the code as a part of the function inside a class "MarinaService" and then access it by importing a class instance (Dependency injection)

All files that end with "...-model.ts" are model definitions which use mongoose schema based approach.

Middleware is defined in the "middleware" folder. "auth-user-api-access.ts" file contains middleware used to verify if the user is logged in, and we use this
middleware on every api call which should only be made by logged in user to ensure app safety. 
Check "marina-routes.ts" for example. 
Another example is "chech-if-marina-occupation-creation-is-possible" middleware which is used in "occupation-routes.ts" before we create an occupation. It calculates if the new occupation
is going over the limit.

For context of the app and what does it do, check the frontend repository on my github.
Used tools and what for:

bcrypt - Used for hashing passwords

chalk - "Creative" logging. Not my part of the code, i just used it since it makes catching API calls much easier in console.

Cookie parser - Used to handle cookies on the server side. 

Cors - Used to handle CORS functionality

dotenv - Used for access to process.env . Check "config.ts" for more. All config.env values are stored in the .env file

express - Express framework is used to develop this backend solution

jsonwebtoken - Used to "sign" and "verify" web tokens used for logging in, verifying and logging out.

mongoose - Used to ease working with MongoDB. Mongoose is a schema based solution for working with MongoDB

nodemon - Used in development for hot reloading

ts-node - Planned to use this to run scripts, but it never came true (will be done further in development).
