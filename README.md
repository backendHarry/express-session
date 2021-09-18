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

---

# API DOCUMENTATION

# express-session-auth

# Express session authentication (express-session-auth)

````All about authentication

The express-session-auth is a project that uses express, node ... to build a full blown application on Authentication(session Authentication).

## Documentation for API

## Indices

* [Register](#register)

  * [Error message for secret question not included for password reset](#1-error-message-for-secret-question-not-included-for-password-reset)
  * [Expired token from not verifying email on time](#2-expired-token-from-not-verifying-email-on-time)
  * [Register successful](#3-register-successful)
  * [Sub input fields of secret question error validation](#4-sub-input-fields-of-secret-question-error-validation)
  * [User verified with email within some minutes before token expires](#5-user-verified-with-email-within-some-minutes-before-token-expires)
  * [register error for input fields](#6-register-error-for-input-fields)
  * [verify user token expires](#7-verify-user-token-expires)

* [forget password](#forget-password)

  * [Answer received and success](#1-answer-received-and-success)
  * [Error user requests to change password and email or username is not provided](#2-error-user-requests-to-change-password-and-email-or-username-is-not-provided)
  * [Password Reset completed successfully](#3-password-reset-completed-successfully)
  * [prompts for user saved question](#4-prompts-for-user-saved-question)

* [login](#login)

  * [login error with no fields](#1-login-error-with-no-fields)
  * [login success with email as well](#2-login-success-with-email-as-well)
  * [login successful with username field](#3-login-successful-with-username-field)
  * [wrong password with correct username/email](#4-wrong-password-with-correct-usernameemail)
  * [wrong username or email](#5-wrong-username-or-email)

* [Ungrouped](#ungrouped)

  * [logout success](#1-logout-success)


--------


## Register



### 1. Error message for secret question not included for password reset



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/V1/auth/register
````

**_Body:_**

```js
{
    "username":"harrisonn",
    "email":"harrisonn@gmail.com",
    "password":"AppLove123!",
    "confirmPassword":"AppLove123!"
}
```

### 2. Expired token from not verifying email on time

**_Endpoint:_**

```bash
Method: GET
Type:
URL: 127.0.0.1:5000/api/V1/auth/verify-account
```

**_Query params:_**

| Key     | Value                                                            | Description |
| ------- | ---------------------------------------------------------------- | ----------- |
| user_id | 613e735209dc041decd4c9e2                                         |             |
| token   | a4184439f3975ba4abcf80c0cc6a8b0ee33b8e5052793e27cb0b8c21918d0cfe |             |

### 3. Register successful

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/V1/auth/register
```

**_Body:_**

```js
{
    "username":"harrison",
    "email":"harrison@gmail.com",
    "password":"AppLove123",
    "confirmPassword":"AppLove123"
}
```

### 4. Sub input fields of secret question error validation

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/V1/auth/register
```

**_Body:_**

```js
{
    "username":"harrisonn",
    "email":"harrisonn@gmail.com",
    "password":"AppLove123!",
    "confirmPassword":"AppLove123!",
    "secretQuestion":{
        "question":"My fav color",
        "answer":""
    }
}
```

### 5. User verified with email within some minutes before token expires

**_Endpoint:_**

```bash
Method: GET
Type:
URL: 127.0.0.1:5000/api/V1/auth/verify-account
```

**_Query params:_**

| Key     | Value                                                            | Description |
| ------- | ---------------------------------------------------------------- | ----------- |
| user_id | 613e76712b7cf01664af119d                                         |             |
| token   | 389de2386259c49b5399e1756c626db29281af9dd546c7cbfd2a273786ecc25f |             |

### 6. register error for input fields

### Register route to register user error(field is required error)

The API returns a 400 (Bad request) to client for bad field inputs.

That is input length is shorter than it's required

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/V1/auth/register
```

**_Body:_**

```js
{
    "username":"harrisonn",
    "email":"harrisonn@gmail.com",
    "password":"AppLove123!",
    "confirmPassword":"AppLove123!"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: register error, username field is shorter than 6 char

**_Body:_**

```js
{
    "username": "harry"
}
```

##### I. Example Response: register error, username field is shorter than 6 char

```js
{
    "errors": {
        "username": "username must be atleast 6 characters long",
        "email": null,
        "password": null,
        "confirmPassword": null
    }
}
```

**_Status Code:_** 400

<br>

##### II. Example Request: register error, field name is required

**_Body:_**

```js
{
}
```

##### II. Example Response: register error, field name is required

```js
{
    "errors": {
        "username": "username is required",
        "email": null,
        "password": null,
        "confirmPassword": null
    }
}
```

**_Status Code:_** 400

<br>

##### III. Example Request: register error, invalid email error

**_Body:_**

```js
{
    "username": "harrison",
    "email": "shshs"
}
```

##### III. Example Response: register error, invalid email error

```js
{
    "errors": {
        "username": null,
        "email": "Please, enter a valid email",
        "password": null,
        "confirmPassword": null
    }
}
```

**_Status Code:_** 400

<br>

##### IV. Example Request: register error, password and confirm password do not match

**_Body:_**

```js
{
    "username": "harrison",
    "email": "harrison@gmail.com",
    "password": "1234567",
    "confirmPassword": "1234"
}
```

##### IV. Example Response: register error, password and confirm password do not match

```js
{
    "errors": {
        "username": null,
        "email": null,
        "password": null,
        "confirmPassword": "passswords do not match"
    }
}
```

**_Status Code:_** 400

<br>

##### V. Example Request: register error, password strength checker

**_Body:_**

```js
{
    "username": "harrison",
    "email": "harrison@gmail.com",
    "password": "1234567",
    "confirmPassword": "1234567"
}
```

##### V. Example Response: register error, password strength checker

```js
{
    "errors": {
        "password": "password should contain Uppercase, lowerCase, Number and character"
    },
    "message": "passwords should be atleast 8 Characters long, with Uppercasem lowercase, numbers and characters mix to ensure secured password"
}
```

**_Status Code:_** 400

<br>

##### VI. Example Request: register error for input fields. username is already taken. suggested usrname logic

**_Body:_**

```js
{
    "username":"harrisonn",
    "email":"harrisonn@gmail.com",
    "password":"April1234#!",
    "confirmPassword":"April1234#!"
}
```

##### VI. Example Response: register error for input fields. username is already taken. suggested usrname logic

```js
{
    "errors": {
        "username": "username harrisonn is already taken"
    },
    "message": "Suggested username of harrisonnAcademic_535"
}
```

**_Status Code:_** 400

<br>

### 7. verify user token expires

**_Endpoint:_**

```bash
Method: GET
Type:
URL: 127.0.0.1:5000/api/V1/auth/verify-account
```

**_Query params:_**

| Key     | Value                                                            | Description |
| ------- | ---------------------------------------------------------------- | ----------- |
| user_id | 6141081d6eda7e06a4b0c4b9                                         |             |
| token   | d6f6014abc85b9ab17a7ec1385d8a6c70fcae6d9da73e4c35c71d2d31859ae29 |             |

## forget password

### 1. Answer received and success

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/v1/auth/confirm-question
```

**_Query params:_**

| Key            | Value                    | Description |
| -------------- | ------------------------ | ----------- |
| username_email | 6142e9f9b627221704ed8b12 |             |

**_Body:_**

```js
{
    "answer":"naruto"
}
```

### 2. Error user requests to change password and email or username is not provided

**_Endpoint:_**

```bash
Method: POST
Type:
URL: 127.0.0.1:5000/api/v1/auth/forget-password
```

### 3. Password Reset completed successfully

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/v1/auth/change-password
```

**_Query params:_**

| Key   | Value                                                            | Description |
| ----- | ---------------------------------------------------------------- | ----------- |
| token | ea2d4156d31a7ae920dcb12320476cda77dba71d7aa06d18eb28a28b35da6dfb |             |

**_Body:_**

```js
{
    "password":"tsunade106",
    "confirmPassword":"tsunade106"
}
```

### 4. prompts for user saved question

This redirects user to 127.0.0.1:5000/api/v1/confirm-password

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/v1/auth/forget-password
```

**_Body:_**

```js
{
    "email_username":"hokage@gmail.com"
}
```

## login

### 1. login error with no fields

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/V1/auth/login
```

**_Body:_**

```js
{
}
```

### 2. login success with email as well

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/V1/auth/login
```

**_Body:_**

```js
{
    "username":"osagiedeharrison@yahoo.com",
    "password":"Ab123456_"
}
```

### 3. login successful with username field

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/V1/auth/login
```

**_Body:_**

```js
{
    "username":"code_hokage",
    "password":"Ab123456_"
}
```

### 4. wrong password with correct username/email

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/V1/auth/login
```

**_Body:_**

```js
{
    "username":"code_hokage",
    "password":"d"
}
```

### 5. wrong username or email

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:5000/api/V1/auth/login
```

**_Body:_**

```js
{
    "username":"h",
    "password":"s"
}
```

## Ungrouped

### 1. logout success

**_Endpoint:_**

```bash
Method: GET
Type:
URL: 127.0.0.1:5000/api/V1/auth/logout
```

---

[Back to top](#express-session-auth)

> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-09-18 11:41:30 by [docgen](https://github.com/thedevsaddam/docgen)
