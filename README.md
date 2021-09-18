# Express session Authentication

## Description

The express-session project is a complete project based on authentication and specifically session authentication

Most recently, the use of token authentication (JWT Tokens) have taken most of today's authentication pratices.
Each of the authentication method have each of their uses best applied depending on the application to build, session based authenticatcion which is the traditional method for authenticating users on the web has been in existent from the start of web development, and still operates today.

### Session Authentication

It has the advantage when it comes to browsers, and it operates most of it's work SERVER SIDE, that is the server creates some token and that token is used to authenticate users. The token doesnt hold user information, like username and PASSWORDS, it just creates a token for a "session" which is valid until the user ends that sesion.

Think of it as users been invited to a party by some person(s), when the user confirms his/her idenntity and is found to be on the invitees list, the user is given some ID card, untill the user holds that card or is in possession of that card, he/she is allowed within the party. If the user loses the card or returns it back, he/she looses the session.

So basically that's how it works, when users log in, we confirm their details to what was registered with and if they match, we give the user's client some cookie to help give the session stateful(that is for invitees to always show the bouncers), and then the user gets a session untill he/she looses the cookie(Card) by deleting it or the session ends(Party ends LOL).

### Why JWT over session Auth

Most tech today, backend to frontend now build apps (Mobile apps) and few still use the conventional websites..
Mobile apps have a poor cookie management , hence we use JWT for a mobile architecture and a lot of people now choose JWT, as it can work on both websites and mobile apps.

### Why SESSION over JWT

JWTs can be used for both mobile and websites, but JWT for websites is almost the same for Session cookie as a token is still created and kept on the client to make the auth stateful, to even make things more safe(prevent XSS), we use HttpOnly to make attackers, have a stressed time when getting info from our tokens, so instead of using JWT in browsers which have almost no difference with session, we use what is more secured and trusted for the process, and also JWT payload contains info like username and PASSWORD, which Session tokens dont hold, hence for more secured in browsers, session works well..

## Features

- ### JOI validation to register user
- ### A Password Checker to help users write good and secured passwords
- ### Hashed Passwords while registering users
- ### Creates Token after registering user for users to verify their email and make account active.
- ### Unique usernames for usernames already in use.
- ### Using passport to log in user, and login uses either username or email to login users.
- ### Login is throttled 3 times before sending an email to the user to deactivate account to prevent BRUTE-FORCE attack
- ### Forget password uses the logic of answering a question created by the user which only the user knows the answer to before sending an email to reset email.
- ### User answer was hashed, when creating the question at register routet, to prevent attackers from snoofing the answer in order to reset user account.

## Tools used

- dotenv
- express
- MongoDB and mongoose
- Passport and Passport-local
- express-session
- connect-mongo
- Bcrypt
- Crypto
- express-rate-limitter
- check-password-strength
- JOI
- unique-names-generator

## How to run the project

```Bash
npm install node
cd express-session-auth
npm install
npm run dev
```

```JS
//Happy Coding..
```

### Then at your Api testing tool

- use the register route to register users, with data needed.
- after a successful registration, check your inbox of the email acct provided to verify your acct, you can also check spams.
- click on the link to redirect (but i will advise copy the link for use in your api testing tool, coz redirects normally operate on browser and a backend with no frontend wont work completely).
- you can now proceed to login.
- if case, you forget your password, use the forget-password route, and answer a question only you know the answer to, as our 2FA(factor authentication).
- Provide the email or username you used in registering.
- You will be asked to check your email to fully verify your email's account.
- then a redirect to change the password.
- And finally log in again.

---

> The project now has Email setup. you can test for yourself, and if you are using an Api tool like postman, you will have you will have to copy most links from the email to the postman application, as redirects from an email will mostly redirect to the browser which handles GET requests only. Took 7 days to build the project, Glad i did!!!!
