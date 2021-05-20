# MEAN Foster Care

This is a personal project to create a secure NodeJS Express API using MongoDB / Mongoose, Redis, Json Web Tokens (JWT) with both access and refresh tokens using elliptical curve ES256, PassportJS, Multer for file uploads and secure downloads to/from an Amazon Web Services S3 bucket. A simple web app is included using Angular v12 with Material.

Basic sign in and out is working along with the refresh tokens.

I like Typescript so my API is using it as well. By no means am I proficient but I find it helps to correct silly errors.

## Installation

Clone the repository and use NPM install in the root folder.

```bash
npm install
```

You will need to rename the "nodemon_replace.json" file to "nodemon.json" and change the values in that file to your Mongo, Redis and AWS S3 connection properties.

Important!!! Read the ec_key_generation_instructions.txt to create key pairs for both the access JWTs and the refresh JWTs.

## Usage

While in the root folder, you will see a folder for Server and one for Client. The package.json file in the root folder takes a command to run Concurrently on both projects. If you have issues with Concurrently, try installing it as a global package.

```bash
npm run dev
```
