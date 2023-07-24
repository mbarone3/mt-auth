# Authenticate Money Tracker Apps

REST API to authenticate.


## Using this Starter Template

This repo can be used as an [Adaptable.io](https://adaptable.io) Starter.
For instructions on using this repo as a template and deploying to the Adaptable Cloud in just a few clicks, check out the [Starter Guide](https://adaptable.io/docs/starters/express-prisma-mongo-starter).

## Running a local dev environment

All of the following instructions assume you are in the repo root directory.

### 1. Install Node.js modules

```console
yarn
```

### 2. Set DATABASE_URL

The app uses the environment variable `DATABASE_URL` to connect to your MongoDB instance.
Use a `.env` file to set `DATABASE_URL` in your local dev environment.
The included `sample.env` file contains the correct `DATABASE_URL` to connect to the local cluster.

To set `DATABASE_URL` to connect to your local MongoDB cluster running in Docker, copy the `sample.env` file to `.env`:

```console
cp sample.env .env
```

### 3. Start the app

```console
yarn run dev
```

> **NOTE**: By default, the app listens on port 3000. To use a different port, set the `PORT` environment variable to the desired port number.

### 4. Connect to your app

Use a web browser to connect to [http://localhost:3000](http://localhost:3000)

## Source Code

### REST API (back end)

The implementation of the `/api/token` REST API endpoint is in `src/routes/token.js`.

