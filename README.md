# Merkur-frontend

This is the code behind https://posthus.netpunkt.dk, written in Next.js

## Getting started

The development environment may be set up using either npm or docker-compose.

### Set up your local environment

To run this locally you need to set some environment variables. The following must be set in the application:

- **CLIENT_ID**
  Client id from adgangsplatformen/smaug
- **CLIENT_SECRET**
  Client secret from adgangsplatformen/smaug
- **NEXTAUTH_URL**
  This is the return url from adgangsplatformen
- **NEXTAUTH_SECRET**
  Next-auth secret for encrytion JWTs
- **APIKEYS**
  JSON array of valid API logins
- **FILESTORE_URL**
  Full URL to the filestore API

The following environment variables can be set in the application

- **PORT**
  Port on which Next.js runs. Default is 3000.

Create a file in the root of the project called `.env.local`

> This file is ignored by git and will and should not be added to the GitHub repository. This is a local environment file for your personal workspace.

.env.local

```properties
CLIENT_ID=<Client id from adgangsplatformen/smaug>
CLIENT_SECRET=<Client secret from adgangsplatformen/smaug>
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=<Next-auth secret from staging deploy project>
APIKEYS={"010100":{"apikey":"pass"},"820030":{"apikey":"pass"},"test":{"apikey":"test"},"810010":{"apikey":"pass"}}
FILESTORE_URL=http://dataio-filestore-service.metascrum-staging.svc.cloud.dbc.dk/dataio/file-store-service
```

## Start application

### npm

- `npm install` install dependencies
- `npm run dev:next` starts Next.js development server that runs the actual application

### docker-compose

- `docker-compose -f docker-compose-dev.yml up` will start Storybook on port 4000, Next.js on port 3000

## Running the tests

Start the wiremock server first:

```bash
npm run mock
```

Then start the next development environment pointing to mocked filestore:

```bash
export FILESTORE_URL=http://localhost:8080; npm run dev:next
```

Run cypress tests in interactive mode

```bash
npm run cy:open
```

or headless

```bash
npm run cy:run
```
